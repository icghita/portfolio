from base64 import b64encode
from pathlib import Path

def Encode_Image(image_path: Path) -> str:
    with open(image_path, "rb") as image:
        image_read = image.read()
        image_64 = b64encode(image_read)
    return image_64.decode()