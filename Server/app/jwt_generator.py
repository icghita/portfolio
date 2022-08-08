import uuid
from datetime import datetime, timedelta
from pathlib import Path

import jwt
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.cryptography import rsa
from cryptography.hazmat.primitives.asymmetric.rsa import (RSAPrivateKey,
                                                           RSAPublicKey)

from config import PRIVATE_KEY_PATH, PUBLIC_KEY_PATH


def Save_Key(key: RSAPrivateKey | RSAPublicKey, file: Path):
    if isinstance(key, RSAPrivateKey):
        contents = key.private_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PrivateFormat.TraditionalOpenSSL,
            encryption_algorithm=serialization.NoEncryption(),
        )
    if isinstance(key, RSAPublicKey):
        contents = key.public_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PublicFormat.SubjectPublicKeyInfo,
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


def Generate_JWT():
    now = datetime.utcnow()
    payload = {
        "sub": str(uuid.uuid4()),
        "aud": "http://127.0.0.1:8000/items",
        "iat": now.timestamp(),
        "exp": (now + timedelta(hours=24)).timestamp(),
        "scope": "openid",
    }

    private_key_text = (Path(__file__).parent / PRIVATE_KEY_PATH).read_text()
    private_key = serialization.load_pem_private_key(
        private_key_text.encode(),
        password=None,
    )
    return jwt.encode(payload=payload, key=private_key, algorithm="RS256")
