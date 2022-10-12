import graphene
from graphene_sqlalchemy import SQLAlchemyObjectType
from sqlalchemy.orm import Session, relationship
from sqlalchemy import Table, Column, String, Integer, ForeignKey
from models.database import SqlAlchemyBase
from utils.encoding import Generate_UUID


class ImagesTable(SqlAlchemyBase):
    __tablename__ = "Images"
    id = Column(String, primary_key=True, default=Generate_UUID)
    url = Column(String, index=True)
    encoded = Column(String)
    description = Column(String, index=True)
    rows = Column(Integer, index=True)
    cols = Column(Integer, index=True)
    item_id = Column(String, ForeignKey("Items.id"), onupdate="CASCADE")

    def dict(self):
        return {
            "id": self.id,
            "url": self.url,
            "description": self.description,
            "rows": self.rows,
            "cols": self.cols,
            "item_id": self.item_id,
        }


class Image(SQLAlchemyObjectType):
    class Meta:
        model = ImagesTable
        interfaces = (graphene.relay.Node, )
        