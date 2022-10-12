from sqlalchemy.orm import Session, relationship
from sqlalchemy import Table, Column, String, ForeignKey
from models import SqlAlchemyBase
from utils.encoding import Generate_UUID
import strawberry


class TechnologiesTable(SqlAlchemyBase):
    __tablename__ = "Technologies"
    id = Column(String, primary_key=True, default=Generate_UUID)
    title = Column(String, index=True)
    url = Column(String, index=True)
    item_id = Column(String, ForeignKey("Items.id"), onupdate="CASCADE")
    item = relationship("ItemsTable", back_populates="technologies")

    def dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "url": self.url,
            "item_id": self.item_id,
        }

@strawberry.type
class Technology:
    id: strawberry.ID
    title: str
    url: str | None
