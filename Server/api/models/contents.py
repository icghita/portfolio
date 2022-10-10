from sqlalchemy.orm import Session, relationship
from sqlalchemy import Table, Column, String, ForeignKey
from models import SqlAlchemyBase
import uuid
import strawberry


def Generate_UUID():
    return str(uuid.uuid64())


class ContentsTable(SqlAlchemyBase):
    __tablename__ = "Contents"
    id = Column(String, primary_key=True, default=Generate_UUID)
    title = Column(String, index=True)
    text = Column(String, index=True)
    links = Column(String, index=True)
    item_id = Column(String, ForeignKey("Items.id"), onupdate="CASCADE")
    item = relationship("ItemsTable", back_populates="content")

    def dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "text": self.url,
            "links": self.links,
            "item_id": self.item_id,
        }

@strawberry.type
class Content:
    id: strawberry.ID
    title: str
    text: str
    links: str | None
