FROM python:3.8.5

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

ARG DEBUG=${DEBUG}
ARG DJANGO_SECRET_KEY=${DJANGO_SECRET_KEY}
ARG DATABASE_URL=${DATABASE_URL}
ARG MINIO_STORAGE_ACCESS_KEY=${MINIO_STORAGE_ACCESS_KEY}
ARG MINIO_STORAGE_SECRET_KEY=${MINIO_STORAGE_SECRET_KEY}
ARG MINIO_STORAGE_BUCKET_NAME=${MINIO_STORAGE_BUCKET_NAME}

RUN mkdir -p /src
RUN mkdir -p /src/staticfiles
RUN touch /src/.env
WORKDIR /src

COPY ./requirements.txt /src/
RUN pip install --no-cache-dir -r requirements.txt
COPY ./ /src

EXPOSE 80

CMD ["python", "manage.py", "runserver", "0.0.0.0:80"]
# CMD ["gunicorn", "pizzaclub.wsgi:application", "--bind", "0.0.0.0:80"]
