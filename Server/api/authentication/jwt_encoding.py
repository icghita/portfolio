import uuid
import jwt
import strawberry
from datetime import datetime, timedelta
from pathlib import Path
from cryptography.fernet import Fernet
from cryptography.hazmat.primitives.asymmetric import dsa, rsa
from cryptography.hazmat.primitives.asymmetric.rsa import RSAPrivateKey, RSAPublicKey
from cryptography.x509 import load_pem_x509_certificate
from cryptography.hazmat.primitives.serialization import (
    load_pem_public_key,
    load_pem_private_key,
    Encoding,
    PrivateFormat,
    PublicFormat,
    NoEncryption,
    BestAvailableEncryption
)
from config import PRIVATE_KEY_PATH, PUBLIC_KEY_PATH, SERVER_URL, PRIVATE_PASS


@strawberry.type
class JWT:
    token: str

    def __init__(self, token: str):
        self.token = token


def Save_Key(key: RSAPrivateKey | RSAPublicKey, file: Path):
    if isinstance(key, RSAPrivateKey):
        contents = key.private_bytes(
            encoding=Encoding.PEM,
            format=PrivateFormat.PKCS8,
            encryption_algorithm=NoEncryption(),
        )
    if isinstance(key, RSAPublicKey):
        contents = key.public_bytes(
            encoding=Encoding.PEM,
            format=PublicFormat.SubjectPublicKeyInfo,
        )
    file.write_bytes(contents)


def Generate_Keys(size: int):

    private_key = rsa.generate_private_key(
        public_exponent=65537,
        key_size=size,
    )
    Save_Key(private_key, (Path(__file__).parent / PRIVATE_KEY_PATH))

    public_key = private_key.public_key()
    Save_Key(public_key, (Path(__file__).parent / PUBLIC_KEY_PATH))


def Generate_JWT() -> JWT:
    now = datetime.utcnow()
    payload = {
        "sub": str(uuid.uuid4()),
        "aud": SERVER_URL,
        "iat": now.timestamp(),
        "exp": (now + timedelta(hours=24)).timestamp(),
        "scope": "openid",
    }

    private_key_text = (Path(__file__).parent / PRIVATE_KEY_PATH).read_text()
    contents_array = private_key_text.strip().split("\n")
    key = "".join(contents_array[1:len(contents_array)-1])

    return JWT(jwt.encode(payload=payload, key=key))


def Decode_And_Validate_Token(access_token):

    unverified_headers = jwt.get_unverified_header(access_token)

    private_key_text = (Path(__file__).parent / PRIVATE_KEY_PATH).read_text()
    contents_array = private_key_text.strip().split("\n")
    key = "".join(contents_array[1:len(contents_array)-1])

    return jwt.decode(
        access_token,
        key=key,
        algorithms=unverified_headers["alg"],
        audience=SERVER_URL,
    )


""" from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.cryptography import rsa
from cryptography.hazmat.primitives.asymmetric.rsa import (RSAPrivateKey,
                                                           RSAPublicKey) """
