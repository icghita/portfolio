FROM python:3.10.5-alpine
WORKDIR /code
RUN apk add libc-dev
RUN apk add build-base
RUN apk add linux-headers
RUN pip install -U pip
COPY ./requirements /code/requirements
RUN pip install --no-cache-dir --upgrade -r /code/requirements
EXPOSE 8000
COPY ./api /code/api
COPY ./db /code/db
WORKDIR /code/api
CMD ["uvicorn", "main:api", "--proxy-headers", "--host", "0.0.0.0", "--port", "8000"]
