FROM python:3.10.5-alpine
WORKDIR /code/app
COPY ./requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/pip_requirements
EXPOSE 8000
COPY ./app /code/app
CMD ["uvicorn", "main:api", "--proxy-headers", "--host", "0.0.0.0", "--port", "8000"]
