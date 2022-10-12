import graphene
from graphene_sqlalchemy import SQLAlchemyObjectType
from sqlalchemy.orm import Session, relationship
from sqlalchemy import Table, Column, String, ForeignKey
from models.database import SqlAlchemyBase
from utils.encoding import Generate_UUID


class TechnologiesTable(SqlAlchemyBase):
    __tablename__ = "Technologies"
    id = Column(String, primary_key=True, default=Generate_UUID)
    title = Column(String, index=True)
    url = Column(String, index=True)
    item_id = Column(String, ForeignKey("Items.id"), onupdate="CASCADE")

    def dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "url": self.url,
            "item_id": self.item_id,
        }


class Technology(SQLAlchemyObjectType):
    class Meta:
        model = TechnologiesTable
        interfaces = (graphene.relay.Node, )
