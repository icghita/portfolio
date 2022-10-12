from sqlalchemy.orm import Session, relationship
from sqlalchemy import Table, Column, String
from models import SqlAlchemyBase
from utils.encoding import Generate_UUID
import strawberry


class ItemsTable(SqlAlchemyBase):
    __tablename__ = "Items"
    id = Column(String, primary_key=True, default=Generate_UUID)
    title = Column(String, index=True)
    subtitle = Column(String, index=True)
    description = Column(String, index=True)
    images = relationship("ImagesTable", back_populates="item")
    technologies = relationship("TechnologiesTable", back_populates="item")
    content = relationship("ContentsTable", back_populates="item")

    def dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "subtitle": self.subtitle,
            "description": self.description,
        }


@strawberry.type
class Item:
    id: strawberry.ID
    title: str
    subtitle: str | None
    description: str | None
