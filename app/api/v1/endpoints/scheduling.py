from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import or_
from typing import List, Optional
from datetime import datetime, date

from schemas.slot import SlotOut
from schemas.appointment import AppointmentCreate, AppointmentUpdate, AppointmentOut
from models.user import User
from models.health_unit import HealthUnit
from models.slot import Slot
from models.exam_request import ExamRequest
from models.consultation_request import ConsultationRequest
from models.appointment import Appointment
from core.database import get_db
from core.security import obter_usuario_atual

router = APIRouter(prefix="/scheduling", tags=["Agendamento"])


@router.get(
    "/vagas",
    response_model=List[SlotOut],
    summary="Listar vagas disponíveis",
    description=(
        "Retorna uma lista de vagas disponíveis para agendamento. "
        "Permite filtros opcionais por unidade de saúde, profissional, cidade, região e status da vaga."
    )
)
def get_vagas(
    db: Session = Depends(get_db),
    unidade_id: Optional[int] = None,
    profissional_id: Optional[int] = None,
    regiao: Optional[str] = None,
    cidade: Optional[str] = None,
    status_vaga: Optional[str] = "disponivel",
    usuario_atual: User = Depends(obter_usuario_atual)
):
    """
    Lista as vagas disponíveis para agendamento, com filtros opcionais.

    - **unidade_id**: filtrar por unidade de saúde
    - **profissional_id**: filtrar por ID do profissional
    - **cidade**: filtrar por cidade
    - **regiao**: filtrar por estado/região
    - **status_vaga**: status da vaga (padrão: 'disponivel')
    """
    query = db.query(Slot).filter(Slot.status == status_vaga)

    if unidade_id:
        query = query.filter(Slot.unidade_saude_id == unidade_id)
    
    if profissional_id:
        query = query.filter(Slot.profissional_id == profissional_id)

    if cidade:
        query = query.join(HealthUnit).filter(HealthUnit.city == cidade)
    
    if regiao:
        query = query.join(HealthUnit).filter(HealthUnit.state == regiao)

    vagas = query.all()
    
    if not vagas:
        raise HTTPException(status_code=404, detail="Nenhuma vaga encontrada para os critérios especificados.")
    
    return vagas


@router.post(
    "/agendar",
    response_model=AppointmentOut,
    status_code=status.HTTP_201_CREATED,
    summary="Agendar demanda em vaga",
    description="Associa uma solicitação de exame ou consulta a uma vaga disponível."
)
def agendar_demanda_em_vaga(
    agendamento_data: AppointmentCreate,
    db: Session = Depends(get_db),
    usuario_atual: User = Depends(obter_usuario_atual)
):
    """
    Realiza o agendamento de uma solicitação em uma vaga.

    - **vaga_id**: ID da vaga a ser ocupada
    - **demanda_id**: ID da solicitação (exame ou consulta)
    - **tipo_demanda**: 'exame' ou 'consulta'
    """
    vaga = db.query(Slot).get(agendamento_data.vaga_id)
    if not vaga or vaga.status != "disponivel":
        raise HTTPException(status_code=400, detail="Vaga não disponível.")

    demanda = None
    if agendamento_data.tipo_demanda == "exame":
        demanda = db.query(ExamRequest).get(agendamento_data.demanda_id)
        if not demanda:
            raise HTTPException(status_code=404, detail="Solicitação de exame não encontrada.")
        if demanda.paciente_id != usuario_atual.id:
            raise HTTPException(status_code=403, detail="Não autorizado.")
        if demanda.status_solicitacao != "pendente":
            raise HTTPException(status_code=400, detail="Solicitação já agendada ou concluída.")
    elif agendamento_data.tipo_demanda == "consulta":
        demanda = db.query(ConsultationRequest).get(agendamento_data.demanda_id)
        if not demanda:
            raise HTTPException(status_code=404, detail="Solicitação de consulta não encontrada.")
        if demanda.paciente_id != usuario_atual.id:
            raise HTTPException(status_code=403, detail="Não autorizado.")
        if demanda.status_solicitacao != "pendente":
            raise HTTPException(status_code=400, detail="Solicitação já agendada ou concluída.")

    campos = {
        "vaga_id": vaga.id,
        "paciente_id": usuario_atual.id
    }
    if agendamento_data.tipo_demanda == "exame":
        campos["solicitacao_exame_id"] = demanda.id
    else:
        campos["solicitacao_consulta_id"] = demanda.id
    
    novo_agendamento = Appointment(**campos)

    vaga.status = "ocupada"
    demanda.status_solicitacao = "agendado"

    db.add(novo_agendamento)
    db.add(vaga)
    db.add(demanda)
    db.commit()
    db.refresh(novo_agendamento)
    return novo_agendamento


@router.put(
    "/agendar/{agendamento_id}",
    response_model=AppointmentOut,
    summary="Atualizar agendamento",
    description="Permite mover um agendamento existente para uma nova vaga disponível."
)
def atualizar_agendamento(
    agendamento_id: int,
    dados_atualizacao: AppointmentUpdate,
    db: Session = Depends(get_db),
    usuario_atual: User = Depends(obter_usuario_atual)
):
    """
    Atualiza o agendamento movendo-o para outra vaga.

    - Verifica se o agendamento e a nova vaga existem.
    - Libera a vaga antiga e ocupa a nova.
    - Requer que o usuário seja o paciente ou admin.
    """
    agendamento = db.query(Appointment).get(agendamento_id)
    if not agendamento:
        raise HTTPException(status_code=404, detail="Agendamento não encontrado.")

    if agendamento.paciente_id != usuario_atual.id and usuario_atual.user_type != "admin_global":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Não autorizado.")

    vaga_antiga = db.query(Slot).get(agendamento.vaga_id)
    if vaga_antiga:
        vaga_antiga.status = "disponivel"
        db.add(vaga_antiga)

    nova_vaga = db.query(Slot).get(dados_atualizacao.vaga_id)
    if not nova_vaga or nova_vaga.status != "disponivel":
        raise HTTPException(status_code=400, detail="Nova vaga indisponível.")

    nova_vaga.status = "ocupada"
    agendamento.vaga_id = nova_vaga.id

    db.add(agendamento)
    db.add(nova_vaga)
    db.commit()
    db.refresh(agendamento)
    return agendamento


@router.delete(
    "/agendar/{agendamento_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Cancelar agendamento",
    description="Remove um agendamento existente, liberando a vaga e retornando a solicitação para status 'pendente'."
)
def cancelar_agendamento(
    agendamento_id: int,
    db: Session = Depends(get_db),
    usuario_atual: User = Depends(obter_usuario_atual)
):
    """
    Cancela um agendamento e atualiza o status da vaga e da solicitação.

    - Libera a vaga.
    - Retorna a solicitação para o status 'pendente'.
    - Requer ser o paciente ou admin.
    """
    agendamento = db.query(Appointment).get(agendamento_id)
    if not agendamento:
        raise HTTPException(status_code=404, detail="Agendamento não encontrado.")

    if agendamento.paciente_id != usuario_atual.id and usuario_atual.user_type != "admin_global":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Não autorizado.")

    vaga = db.query(Slot).get(agendamento.vaga_id)
    if vaga:
        vaga.status = "disponivel"
        db.add(vaga)

    if agendamento.solicitacao_exame_id:
        demanda = db.query(ExamRequest).get(agendamento.solicitacao_exame_id)
    elif agendamento.solicitacao_consulta_id:
        demanda = db.query(ConsultationRequest).get(agendamento.solicitacao_consulta_id)

    if demanda:
        demanda.status_solicitacao = "pendente"
        db.add(demanda)

    db.delete(agendamento)
    db.commit()
    return
