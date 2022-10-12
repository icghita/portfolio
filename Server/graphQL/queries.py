import strawberry
from strawberry.permission import BasePermission
from strawberry.types import Info
from fastapi import Depends, Request, WebSocket
from sqlalchemy.orm import Session
from typing import List, Any, Union
from models.items import Item, ItemsTable
from models.images import Image, ImagesTable
from models.technologies import Technology, TechnologiesTable
from models.contents import Content, ContentsTable
from database import LocalSession
from authentication.jwt_encoding import Generate_JWT, JWT
from pathlib import Path
from config import SERVER_IMAGES_FOLDER
from utils.encoding import Encode_Image
from utils.generate_images import Sample_Image, Background


class IsAuthenticated(BasePermission):
    message = "User is not authenticated"

    def has_permission(self, source: Any, info: Info, **kwargs) -> bool:

        request: Union[Request, WebSocket] = info.context["request"]

        if "Authorization" in request.headers:
            return True
        elif "auth" in request.query_params:
            return True
        return False


@strawberry.type
class Query:
    @strawberry.field
    def Items(self) -> List[Item]:
        try:
            db = LocalSession()
            output = db.query(ItemsTable).all()
        finally:
            db.close()
        return output
    
    @strawberry.field
    def Technologies(self, itemId: str) -> List[Technology]:
        try:
            db = LocalSession()
            output = db.query(TechnologiesTable).filter_by(item_id=itemId).all()
        finally:
            db.close()
        return output
    
    @strawberry.field
    def Contents(self, itemId: str) -> List[Content]:
        try:
            db = LocalSession()
            output = db.query(ContentsTable).filter_by(item_id=itemId).all()
        finally:
            db.close()
        return output

    @strawberry.field
    def Images(self, item_id: str) -> List[Image]:
        try:
            db = LocalSession()
            output: List[Image] = []  
            image_table_entries = db.query(ImagesTable).filter_by(item_id=item_id).all()
            for image in image_table_entries:
                encoded_image = Encode_Image(Path(Path(SERVER_IMAGES_FOLDER) / image.url))
                output.append(Image(image.id, encoded_image, image.description, image.rows, image.cols))
        finally:
            db.close()
        return output
    
    @strawberry.field
    def Background(self) -> Background:
        output = Sample_Image()
        return output
    
    
graphql_schema = strawberry.Schema(query=Query)


@strawberry.type
class Query_JWT:
    @strawberry.field
    def JWT(self) -> List[JWT]:
        output: List[JWT] = [] 
        output.append(Generate_JWT())
        return output
    
jwt_schema = strawberry.Schema(query=Query_JWT)