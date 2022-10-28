import time
import PIL
import strawberry
import psutil
from multiprocessing import Process
from os import listdir, makedirs, path, remove
from pathlib import Path
from random import randint

from tensorflow import keras
from keras.models import load_model
from keras.utils import img_to_array, load_img, save_img

from utils.diffusion import *
from utils.diffusion.models import DiffusionModel
from utils.diffusion.processing import Upscale_Image

from config import (DIFFUSION_MODEL_PATH,
                    GENERATED_OUTPUT,
                    IMG_EXTENSION,
                    UPSCALE_MODEL_PATH,
                    PID_PATH)
from utils.encoding import Encode_Image, Generate_UUID


@strawberry.type
class Background:
    id: strawberry.ID
    lrimage: str | None
    hrimage: str | None

    def __init__(self, lr_image: str | None, hr_image: str | None):
        self.id = Generate_UUID()
        self.lrimage = lr_image
        self.hrimage = hr_image


def Run_Models():
    diffusion_model = DiffusionModel(image_size, widths, block_depth)
    diffusion_model.compile(optimizer=keras.optimizers.experimental.AdamW(
        learning_rate=learning_rate, weight_decay=weight_decay),
        loss=keras.losses.mean_absolute_error,
    )
    diffusion_model.normalizer.mean = tf.constant(diffusion_mean,
                                                  shape=(1, 1, 1, 3),
                                                  dtype=tf.float32)
    diffusion_model.normalizer.variance = tf.constant(diffusion_variance,
                                                      shape=(1, 1, 1, 3),
                                                      dtype=tf.float32)
    diffusion_model.build(tf.TensorShape([]))
    diffusion_model.load_weights(DIFFUSION_MODEL_PATH)

    generated_images = diffusion_model(tf.constant([]))
    generated_images = tf.clip_by_value(generated_images * 255.0, 0.0, 255.0)
    generated_images = tf.cast(generated_images, tf.uint8)

    upscale_model = tf.saved_model.load(UPSCALE_MODEL_PATH)

    for (index, image) in enumerate(generated_images):
        array_image = img_to_array(image)
        aux_index = index
        while path.exists(GENERATED_OUTPUT + str(aux_index) + "_lr" + IMG_EXTENSION):
            aux_index += 1
        save_img(GENERATED_OUTPUT + str(aux_index) +
                 "_lr" + IMG_EXTENSION, array_image)
        hr_image = Upscale_Image(
            upscale_model, GENERATED_OUTPUT + str(aux_index) + "_lr" + IMG_EXTENSION)
        hr_image.save(GENERATED_OUTPUT + str(aux_index) +
                      "_hr" + IMG_EXTENSION)
    if path.exists(PID_PATH):
        remove(PID_PATH)


def Sample_Image() -> (str, str):

    if not path.exists(GENERATED_OUTPUT):
        makedirs(GENERATED_OUTPUT)
    images = listdir(GENERATED_OUTPUT)

    if len(images) < 50:
        processes = {p.info["pid"]: p.info["name"]
                     for p in psutil.process_iter(attrs=["pid", "name"])
                     }
        if not path.exists(PID_PATH):
            saved_pid = -1
        else:
            with open(PID_PATH, "rt") as file:
                saved_pid = file.read()
                if saved_pid.isdigit():
                    saved_pid = int(saved_pid)
                else:
                    saved_pid = -1
        if saved_pid not in processes:
            proc = Process(target=Run_Models)
            proc.start()
            pid = proc.pid
            with open(PID_PATH, "wt") as wfile:
                wfile.write(str(pid))
    tries = 0
    while tries < 30:
        images = listdir(GENERATED_OUTPUT)
        if len(images) > 2:
            index = randint(0, (len(images) - 1) // 2)
            try:
                file = str(GENERATED_OUTPUT + images[index])
                if file.find("hr") != -1:
                    hr_image_path = Path(file)
                    lr_image_path = Path(file.replace("hr", "lr"))
                else:
                    lr_image_path = Path(file)
                    hr_image_path = Path(file.replace("lr", "hr"))
                encoded_lr_image = Encode_Image(lr_image_path)
                encoded_hr_image = Encode_Image(hr_image_path)
                remove(lr_image_path)
                remove(hr_image_path)
                return Background(encoded_lr_image, encoded_hr_image)
            except:
                continue
        tries += 1
        time.sleep(1)
    return None
