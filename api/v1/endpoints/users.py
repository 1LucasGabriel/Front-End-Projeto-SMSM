from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from schemas.user import UserOut, UserUpdate
from models.user import User
from core.database import get_db
from core.security import get_current_user

router = APIRouter(prefix="/users", tags=["users"])

@router.get("/", response_model=List[UserOut])
def get_all_users(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.user_type != "admin_global":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Permission denied.")
    
    users = db.query(User).all()
    return users

@router.get("/{user_id}", response_model=UserOut)
def get_user_by_id(user_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    user = db.query(User).get(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")
    
    if (current_user.user_type == "admin_global" or
        (current_user.user_type == "admin_local" and current_user.health_unit_id == user.health_unit_id) or
        current_user.id == user.id):
        return user
    else:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Permission denied.")

@router.put("/{user_id}", response_model=UserOut)
def update_user_by_id(user_id: int, user_data: UserUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    target_user = db.query(User).get(user_id)
    if not target_user:
        raise HTTPException(status_code=404, detail="User not found.")
    
    if (current_user.user_type == "admin_global" or
        (current_user.user_type == "admin_local" and current_user.health_unit_id == target_user.health_unit_id)):
        
        update_data = user_data.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(target_user, key, value)
        
        db.add(target_user)
        db.commit()
        db.refresh(target_user)
        return target_user
    else:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Permission denied.")

@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user_by_id(user_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    target_user = db.query(User).get(user_id)
    if not target_user:
        raise HTTPException(status_code=404, detail="User not found.")
    
    if (current_user.user_type == "admin_global" or
        (current_user.user_type == "admin_local" and current_user.health_unit_id == target_user.health_unit_id)):
        
        db.delete(target_user)
        db.commit()
        return {"detail": "User deleted successfully."}
    else:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Permission denied.")