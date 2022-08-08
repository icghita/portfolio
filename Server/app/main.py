from fastapi import Depends, FastAPI, HTTPException
from fastapi.requests import Request
from fastapi.responses import JSONResponse, Response
from sqlalchemy.orm import Session
from fastapi import status
from starlette.middleware.cors import CORSMiddleware
from starlette.middleware.base import (BaseHTTPMiddleware,
                                       RequestResponseEndpoint)

from database import LocalSession, engine
from models import Get_Items, Item
from auth import Decode_And_Validate_Token


class AuthorizeRequestMiddleWare(BaseHTTPMiddleware):
    async def dispatch(self,
                       request: Request,
                       call_next: RequestResponseEndpoint
                       ) -> Response:
        if request.url.path in ["/docs", "/openapi.json"]:
            return await call_next(request)
        if request.method == "OPTIONS":
            return await call_next(request)

        bearer_token = request.headers.get("Authorization")
        if not bearer_token:
            return JSONResponse(
                status_code=status.HTTP_401_UNAUTHORIZED,
                content={
                    "detail": "Missing access token.",
                    "body": "Missing access token."
                }
            )
        try:
            auth_token = bearer_token.split(" ")[1].strip()
            token_payload = Decode_And_Validate_Token(auth_token)
        except Exception as error:
            return JSONResponse(status_code=status.HTTP_401_UNAUTHORIZED,
                                content={"detail": str(error),
                                         "body": str(error)
                                         }
                                )
        else:
            request.state.user_id = token_payload["sub"]
        return await call_next(request)


def Get_Database():
    db = LocalSession()
    try:
        yield db
    finally:
        db.close()


api = FastAPI(debug=True)
#api.add_middleware(AuthorizeRequestMiddleWare)
api.add_middleware(CORSMiddleware,
                   allow_origins=["*"],
                   allow_credentials=True,
                   allow_methods=["*"],
                   allow_headers=["*"]
                   )


@api.get("/")
def read_root():
    return {"Hello": "World"}


@api.get("/items/{id}", response_model=list[Item]|Item)
def Read_Items(id: int, db: Session = Depends(Get_Database)):
    items = Get_Items(id, db)
    if not items:
        raise HTTPException(status_code=404, message=f"{items}")
    return items


""" @api.on_event("startup")
async def startup():
    await Database_Connect()


@api.on_event("shutdown")
async def shutdown():
    await Database_Disconnect()
 """
