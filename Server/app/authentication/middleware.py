from fastapi.requests import Request
from fastapi import status
from fastapi.responses import JSONResponse, Response
from starlette.middleware.base import (BaseHTTPMiddleware,
                                       RequestResponseEndpoint)
from authentication.jwt_encoding import Decode_And_Validate_Token


class AuthorizeRequestMiddleWare(BaseHTTPMiddleware):
    async def dispatch(self,
                       request: Request,
                       call_next: RequestResponseEndpoint
                       ) -> Response:

        if request.url.path in ["/docs", "/openapi.json", "/jwt"]:
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
