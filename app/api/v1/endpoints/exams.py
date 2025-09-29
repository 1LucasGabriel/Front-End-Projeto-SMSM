from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from schemas.exam_request import ExamRequestCreate, ExamRequestUpdate, ExamRequestOut
from models.exam_request import ExamRequest
from models.user import User
from core.database import get_db
from core.security import obter_usuario_atual

router = APIRouter(prefix="/exams", tags=["Exames"])


@router.post(
    "/",
    response_model=ExamRequestOut,
    status_code=status.HTTP_201_CREATED,
    summary="Criar nova solicitação de exame",
    description="Cria uma nova solicitação de exame para o paciente autenticado. Apenas pacientes podem criar solicitações em seu nome."
)
def criar_solicitacao_exame(
    solicitacao: ExamRequestCreate,
    db: Session = Depends(get_db),
    paciente_atual: User = Depends(obter_usuario_atual)
):
    """
    Cria uma nova solicitação de exame.

    - **solicitacao**: dados do exame a ser solicitado.
    - **paciente_atual**: paciente autenticado (usuário logado).
    """
    nova_solicitacao = ExamRequest(**solicitacao.model_dump(), paciente_id=paciente_atual.id)
    db.add(nova_solicitacao)
    db.commit()
    db.refresh(nova_solicitacao)
    return nova_solicitacao


@router.get(
    "/",
    response_model=List[ExamRequestOut],
    summary="Listar solicitações de exame",
    description="Retorna todas as solicitações de exame do usuário autenticado. Se for um administrador global, retorna todas as solicitações do sistema."
)
def obter_solicitacoes_exames(
    db: Session = Depends(get_db),
    usuario_atual: User = Depends(obter_usuario_atual)
):
    """
    Lista todas as solicitações de exame visíveis para o usuário autenticado.

    - Pacientes veem apenas as suas.
    - Admins globais veem todas.
    """
    if usuario_atual.user_type == "admin_global":
        solicitacoes = db.query(ExamRequest).all()
    else:
        solicitacoes = db.query(ExamRequest).filter(ExamRequest.paciente_id == usuario_atual.id).all()
    return solicitacoes


@router.get(
    "/{solicitacao_id}",
    response_model=ExamRequestOut,
    summary="Buscar solicitação de exame por ID",
    description="Retorna uma solicitação de exame pelo ID, se o usuário for o dono ou um administrador."
)
def obter_solicitacao_exame_por_id(
    solicitacao_id: int,
    db: Session = Depends(get_db),
    usuario_atual: User = Depends(obter_usuario_atual)
):
    """
    Retorna uma solicitação de exame específica.

    - **solicitacao_id**: ID da solicitação.
    - **usuario_atual**: usuário autenticado.
    - Permissão: Admins ou dono da solicitação.
    """
    solicitacao = db.query(ExamRequest).get(solicitacao_id)
    if not solicitacao:
        raise HTTPException(status_code=404, detail="Solicitação de exame não encontrada.")
    
    if usuario_atual.user_type == "admin_global" or solicitacao.paciente_id == usuario_atual.id:
        return solicitacao
    else:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Permissão negada.")


@router.put(
    "/{solicitacao_id}",
    response_model=ExamRequestOut,
    summary="Atualizar solicitação de exame",
    description="Atualiza os dados de uma solicitação de exame existente. Somente o autor da solicitação ou um administrador pode realizar esta ação."
)
def atualizar_solicitacao_exame(
    solicitacao_id: int,
    dados_atualizacao: ExamRequestUpdate,
    db: Session = Depends(get_db),
    usuario_atual: User = Depends(obter_usuario_atual)
):
    """
    Atualiza uma solicitação de exame.

    - **solicitacao_id**: ID da solicitação.
    - **dados_atualizacao**: dados a serem atualizados.
    - Permissão: Admins ou autor da solicitação.
    """
    solicitacao = db.query(ExamRequest).get(solicitacao_id)
    if not solicitacao:
        raise HTTPException(status_code=404, detail="Solicitação de exame não encontrada.")
    
    if not (usuario_atual.user_type == "admin_global" or solicitacao.paciente_id == usuario_atual.id):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Permissão negada.")

    dados_dict = dados_atualizacao.model_dump(exclude_unset=True)
    for key, value in dados_dict.items():
        setattr(solicitacao, key, value)
    
    db.add(solicitacao)
    db.commit()
    db.refresh(solicitacao)
    return solicitacao


@router.delete(
    "/{solicitacao_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Deletar solicitação de exame",
    description="Remove uma solicitação de exame do sistema. Apenas o autor da solicitação ou um administrador pode deletá-la."
)
def deletar_solicitacao_exame(
    solicitacao_id: int,
    db: Session = Depends(get_db),
    usuario_atual: User = Depends(obter_usuario_atual)
):
    """
    Deleta uma solicitação de exame.

    - **solicitacao_id**: ID da solicitação.
    - Permissão: Admins ou autor da solicitação.
    """
    solicitacao = db.query(ExamRequest).get(solicitacao_id)
    if not solicitacao:
        raise HTTPException(status_code=404, detail="Solicitação de exame não encontrada.")
    
    if not (usuario_atual.user_type == "admin_global" or solicitacao.paciente_id == usuario_atual.id):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Permissão negada.")
    
    db.delete(solicitacao)
    db.commit()
    return
