import graphene
from pathlib import Path
from typing import List, Any, Union

from models.database import DB
from models.items import Item, ItemsTable
from models.images import Image, ImagesTable
from models.technologies import Technology, TechnologiesTable
from models.contents import Content, ContentsTable
from config import SERVER_IMAGES_FOLDER
from utils.encoding import Encode_Image, Generate_UUID
from utils.generate_images import Sample_Image, BackgroundObject


class Query(graphene.ObjectType):
    Items = graphene.List(lambda: Item)

    def resolve_Items(self, info):
        rows = DB.session.execute(DB.select(ItemsTable)).all()
        rows = list(map(lambda x: x[0], rows))
        return rows

    Technologies = graphene.List(lambda: Technology, itemId=graphene.String())

    def resolve_Technologies(self, info, itemId=None):
        rows = DB.session.execute(DB.select(TechnologiesTable).where(
            TechnologiesTable.item_id == itemId)).all()
        rows = list(map(lambda x: x[0], rows))
        return rows

    Contents = graphene.List(lambda: Content, itemId=graphene.String())

    def resolve_Contents(self, info, itemId=None):
        rows = DB.session.execute(DB.select(ContentsTable).where(
            ContentsTable.item_id == itemId)).all()
        rows = list(map(lambda x: x[0], rows))
        return rows

    Images = graphene.List(lambda: Image, itemId=graphene.String())

    def resolve_Images(self, info, itemId=None):
        rows = DB.session.execute(DB.select(ImagesTable).where(
            ImagesTable.item_id == itemId)).all()
        rows = list(map(lambda x: x[0], rows))
        for image in rows:
            encoded_image = Encode_Image(
                Path(SERVER_IMAGES_FOLDER) / image.url)
            image.encoded = encoded_image
        return rows

    Background = graphene.Field(
        BackgroundObject,
        id=graphene.String(),
        lrimage=graphene.String(),
        hrimage=graphene.String()
    )

    def resolve_Background(self, info):
        (lrimage, hrimage) = Sample_Image()
        return BackgroundObject(
            id=Generate_UUID(),
            lrimage=lrimage,
            hrimage=hrimage,
        )


graphql_schema = graphene.Schema(query=Query)
