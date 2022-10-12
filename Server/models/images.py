from sqlalchemy.orm import Session, relationship
from sqlalchemy import Table, Column, String, Integer, ForeignKey
from models import SqlAlchemyBase
from utils.encoding import Generate_UUID
import strawberry


class ImagesTable(SqlAlchemyBase):
    __tablename__ = "Images"
    id = Column(String, primary_key=True, default=Generate_UUID)
    url = Column(String, index=True)
    description = Column(String, index=True)
    rows = Column(Integer, index=True)
    cols = Column(Integer, index=True)
    item_id = Column(String, ForeignKey("Items.id"), onupdate="CASCADE")
    item = relationship("ItemsTable", back_populates="images")

    def dict(self):
        return {
            "id": self.id,
            "url": self.url,
            "description": self.description,
            "rows": self.rows,
            "cols": self.cols,
            "item_id": self.item_id,
        }

@strawberry.type
class Image:
    id: strawberry.ID
    encoded: str | None
    description: str | None
    rows: int | None
    cols: int | None
    
    def __init__(self, id:str, encoded_image:str|None, description:str|None, rows:str|None, cols:str|None):
        self.id = id
        self.encoded = encoded_image
        self.description = description
        self.rows = rows
        self.cols = cols
