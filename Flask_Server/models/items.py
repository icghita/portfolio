import graphene
from graphene_sqlalchemy import SQLAlchemyObjectType
from sqlalchemy.orm import Session, relationship
from sqlalchemy import Table, Column, String
from models.database import SqlAlchemyBase
from utils.encoding import Generate_UUID


class ItemsTable(SqlAlchemyBase):
    __tablename__ = "Items"
    id = Column(String, primary_key=True, default=Generate_UUID)
    title = Column(String, index=True)
    subtitle = Column(String, index=True)
    description = Column(String, index=True)
    item_id = Column(String, index=True)

    def dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "subtitle": self.subtitle,
            "description": self.description,
            "item_id": self.item_id,
        }


class Item(SQLAlchemyObjectType):
    class Meta:
        model = ItemsTable
        interfaces = (graphene.relay.Node, )
