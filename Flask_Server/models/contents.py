import graphene
from graphene_sqlalchemy import SQLAlchemyObjectType
from sqlalchemy.orm import Session, relationship
from sqlalchemy import Table, Column, String, ForeignKey
from models.database import SqlAlchemyBase
from utils.encoding import Generate_UUID


class ContentsTable(SqlAlchemyBase):
    __tablename__ = "Contents"
    id = Column(String, primary_key=True, default=Generate_UUID)
    title = Column(String, index=True)
    text = Column(String, index=True)
    links = Column(String, index=True)
    item_id = Column(String, ForeignKey("Items.id"), onupdate="CASCADE")

    def dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "text": self.url,
            "links": self.links,
            "item_id": self.item_id,
        }


class Content(SQLAlchemyObjectType):
    class Meta:
        model = ContentsTable
        interfaces = (graphene.relay.Node, )
