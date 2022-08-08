
from pathlib import Path
from config import PUBLIC_KEY_PATH

import jwt
from cryptography.x509 import load_pem_x509_certificate


def Decode_And_Validate_Token(access_token):
    unverified_headers = jwt.get_unverified_header(access_token)
    public_key = load_pem_x509_certificate(
        (Path(__file__).parent / PUBLIC_KEY_PATH).read_text().encode("utf-8")
    ).public_key()
    return jwt.decode(
        access_token,
        key=public_key,
        algorithms=unverified_headers["alg"],
    )
    