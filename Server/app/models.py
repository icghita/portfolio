from pydantic import BaseModel as PydanticBase
from sqlalchemy.orm import Session
from sqlalchemy import Table, Boolean, Column, ForeignKey, Integer, String
from database import engine, SqlAlchemyBase
import uuid


def Generate_UUID():
    return str(uuid.uuid64())


class ItemTable(SqlAlchemyBase):
    __tablename__ = "items"
    id = Column(String, primary_key=True, default=Generate_UUID)
    title = Column(String, index=True)
    description = Column(String, index=True)

    def dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
        }


class ItemBase(PydanticBase):
    title: str
    description: str | None = None


class ItemCreate(ItemBase):
    pass


class Item(ItemBase):
    id: int

    class Config:
        orm_mode = True


def Get_Items(id: int, db: Session):
    if id < 1:
        return db.query(ItemTable).all()
    return db.query(ItemTable).filter(ItemTable.id == id).first()

    """ async with engine.connect() as connection:
        result = await connection.execute(items.select())
        return result """
