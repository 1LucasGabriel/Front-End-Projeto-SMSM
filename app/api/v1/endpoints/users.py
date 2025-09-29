from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from schemas.user import UserOut, UserUpdate
from models.user import User
from core.database import get_db
from core.security import obter_usuario_atual

router = APIRouter(prefix="/users", tags=["users"])


@router.get(
    "/",
    response_model=List[UserOut],
    summary="Listar todos os usuários",
    description="Retorna todos os usuários cadastrados no sistema. Disponível apenas para usuários com perfil de `admin_global`."
)
def get_all_users(
    db: Session = Depends(get_db),
    current_user: User = Depends(obter_usuario_atual)
):
    """
    Lista todos os usuários do sistema.

    - **current_user**: Usuário autenticado (deve ser `admin_global`).
    """
    if current_user.user_type != "admin_global":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Permissão negada.")
    
    users = db.query(User).all()
    return users


@router.get(
    "/{user_id}",
    response_model=UserOut,
    summary="Buscar usuário por ID",
    description="Retorna os dados de um usuário específico, acessível por administradores ou pelo próprio usuário."
)
def get_user_by_id(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(obter_usuario_atual)
):
    """
    Retorna um usuário pelo seu ID.

    - **user_id**: ID do usuário a ser buscado.
    - **current_user**: Usuário autenticado (admin_global, admin_local da mesma unidade ou o próprio usuário).
    """
    user = db.query(User).get(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado.")
    
    if (
        current_user.user_type == "admin_global" or
        (current_user.user_type == "admin_local" and current_user.health_unit_id == user.health_unit_id) or
        current_user.id == user.id
    ):
        return user
    else:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Permissão negada.")


@router.put(
    "/{user_id}",
    response_model=UserOut,
    summary="Atualizar dados de um usuário",
    description="Atualiza os dados de um usuário pelo seu ID. Apenas administradores globais ou locais da mesma unidade têm permissão."
)
def update_user_by_id(
    user_id: int,
    user_data: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(obter_usuario_atual)
):
    """
    Atualiza os dados de um usuário existente.

    - **user_id**: ID do usuário a ser atualizado.
    - **user_data**: Dados novos (modelo `UserUpdate`).
    - **current_user**: Usuário autenticado com permissão (admin_global ou admin_local da mesma unidade).
    """
    target_user = db.query(User).get(user_id)
    if not target_user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado.")
    
    if (
        current_user.user_type == "admin_global" or
        (current_user.user_type == "admin_local" and current_user.health_unit_id == target_user.health_unit_id)
    ):
        update_data = user_data.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(target_user, key, value)
        
        db.add(target_user)
        db.commit()
        db.refresh(target_user)
        return target_user
    else:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Permissão negada.")


@router.delete(
    "/{user_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Deletar um usuário",
    description="Remove um usuário do sistema com base no ID. Somente administradores com permissões adequadas podem executar essa ação."
)
def delete_user_by_id(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(obter_usuario_atual)
):
    """
    Deleta um usuário do sistema.

    - **user_id**: ID do usuário a ser deletado.
    - **current_user**: Usuário autenticado (admin_global ou admin_local da mesma unidade).
    """
    target_user = db.query(User).get(user_id)
    if not target_user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado.")
    
    if (
        current_user.user_type == "admin_global" or
        (current_user.user_type == "admin_local" and current_user.health_unit_id == target_user.health_unit_id)
    ):
        db.delete(target_user)
        db.commit()
        return {"detail": "Usuário excluído com sucesso."}
    else:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Permissão negada.")
