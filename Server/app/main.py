from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from starlette.middleware.cors import CORSMiddleware
from strawberry.asgi import GraphQL
from strawberry import Schema
from database import Get_Database
from models.items import Item, ItemsTable
from authentication.middleware import AuthorizeRequestMiddleWare
from graphQL.queries import graphql_schema, jwt_schema
from config import CLIENT_URL, SERVER_URL


api = FastAPI(debug=True)
api.add_middleware(AuthorizeRequestMiddleWare)
api.add_middleware(CORSMiddleware,
                   allow_origins=[CLIENT_URL, SERVER_URL],
                   allow_credentials=True,
                   allow_methods=["*"],
                   allow_headers=["*"]
                   )

api.add_route("/", GraphQL(graphql_schema))
api.add_route("/jwt", GraphQL(jwt_schema))


@api.get("/{image_path}")
def Fetch_Image(image_path: str):
    return FileResponse(image_path)
