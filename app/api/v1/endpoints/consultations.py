from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.orm import Session
from schemas.consultation_request import ConsultationRequestCreate, ConsultationRequestUpdate, ConsultationRequestOut
from models.consultation_request import ConsultationRequest
from models.user import User
from core.database import get_db
from core.security import obter_usuario_atual

router = APIRouter()

@router.get(
    "/",
    response_model=List[ConsultationRequestOut],
    summary="Listar todas as solicitações de consulta",
    description="Retorna uma lista paginada de todas as solicitações de consulta no sistema. Requer autenticação."
)
def get_all_consultation_requests(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(obter_usuario_atual)
):
    """
    Lista todas as solicitações de consulta.

    - **skip**: número de registros a pular.
    - **limit**: número máximo de registros a retornar.
    - **current_user**: usuário autenticado.
    """
    requests = db.query(ConsultationRequest).offset(skip).limit(limit).all()
    return requests


@router.post(
    "/",
    response_model=ConsultationRequestOut,
    status_code=status.HTTP_201_CREATED,
    summary="Criar nova solicitação de consulta",
    description="Cria uma nova solicitação de consulta com os dados fornecidos. Requer autenticação."
)
def create_consultation_request(
    request_data: ConsultationRequestCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(obter_usuario_atual)
):
    """
    Cria uma nova solicitação de consulta.

    - **request_data**: dados da solicitação (modelo `ConsultationRequestCreate`).
    - **current_user**: usuário autenticado.
    """
    request = ConsultationRequest(**request_data.model_dump())
    db.add(request)
    db.commit()
    db.refresh(request)
    return request


@router.get(
    "/{request_id}",
    response_model=ConsultationRequestOut,
    summary="Buscar solicitação de consulta por ID",
    description="Retorna os detalhes de uma solicitação de consulta específica pelo seu ID. Requer autenticação."
)
def get_consultation_request_by_id(
    request_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(obter_usuario_atual)
):
    """
    Busca uma solicitação de consulta pelo ID.

    - **request_id**: ID da solicitação.
    - **current_user**: usuário autenticado.
    """
    request = db.query(ConsultationRequest).filter(ConsultationRequest.id == request_id).first()
    if request is None:
        raise HTTPException(status_code=404, detail="Solicitação de consulta não encontrada")
    return request


@router.put(
    "/{request_id}",
    response_model=ConsultationRequestOut,
    summary="Atualizar uma solicitação de consulta",
    description="Atualiza os dados de uma solicitação de consulta existente pelo ID. Requer autenticação."
)
def update_consultation_request(
    request_id: int,
    request_data: ConsultationRequestUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(obter_usuario_atual)
):
    """
    Atualiza uma solicitação de consulta existente.

    - **request_id**: ID da solicitação a ser atualizada.
    - **request_data**: novos dados (modelo `ConsultationRequestUpdate`).
    - **current_user**: usuário autenticado.
    """
    request = db.query(ConsultationRequest).filter(ConsultationRequest.id == request_id).first()
    if request is None:
        raise HTTPException(status_code=404, detail="Solicitação de consulta não encontrada")
    
    for key, value in request_data.model_dump(exclude_unset=True).items():
        setattr(request, key, value)
    
    db.commit()
    db.refresh(request)
    return request


@router.delete(
    "/{request_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Deletar uma solicitação de consulta",
    description="Deleta uma solicitação de consulta específica pelo ID. Requer autenticação."
)
def delete_consultation_request(
    request_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(obter_usuario_atual)
):
    """
    Deleta uma solicitação de consulta.

    - **request_id**: ID da solicitação a ser deletada.
    - **current_user**: usuário autenticado.
    """
    request = db.query(ConsultationRequest).filter(ConsultationRequest.id == request_id).first()
    if request is None:
        raise HTTPException(status_code=404, detail="Solicitação de consulta não encontrada")
    
    db.delete(request)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
