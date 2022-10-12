DATABASE_URL = "sqlite:///../db/portfolio_sqlite.db"
PRIVATE_KEY_PATH = "./private_key.pem"
PUBLIC_KEY_PATH = "./public_key.pem"

#SERVER_URL = "server:8000"
#CLIENT_URL = "client:3000"
SERVER_URL = "http://127.0.0.1:8000"
CLIENT_URL = "http://127.0.0.1:3000"

TENSORFLOW_GENERATE_URL = "http://tensorflow_serving:8501/v1/models/diffusion_model:Generate"
TENSORFLOW_UPSCALE_URL = "http://tensorflow_serving:8501/v1/models/upscale_model:predict"

SERVER_IMAGES_FOLDER = "../db/images/"
PRIVATE_PASS = "3f43y0k"

DIFFUSION_MODEL_PATH = "utils/diffusion_checkpoints_100/diffusion_model"
UPSCALE_MODEL_PATH = "utils/upscale_model_54"
GENERATED_OUTPUT = "generated/"
IMG_EXTENSION = ".jpeg"
