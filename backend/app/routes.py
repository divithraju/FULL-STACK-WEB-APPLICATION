from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .database import SessionLocal
from . import crud, schemas

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/products", response_model=schemas.ProductOut)
def add_product(product: schemas.ProductCreate, db: Session = Depends(get_db)):
    return crud.create_product(db, product)

@router.get("/products", response_model=list[schemas.ProductOut])
def list_products(db: Session = Depends(get_db)):
    return crud.get_products(db)
