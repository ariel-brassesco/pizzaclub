FROM python:3.8.5

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

ARG DEBUG=${DEBUG}
ARG DJANGO_SECRET_KEY=${DJANGO_SECRET_KEY}
ARG DATABASE_URL=${DATABASE_URL}
ARG GOOGLE_DRIVE_STORAGE_JSON_KEY_FILE_CONTENTS=${GOOGLE_DRIVE_STORAGE_JSON_KEY_FILE_CONTENTS}

RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/staticfiles
WORKDIR /usr/src/app

COPY ./requirements.txt /usr/src/app/
RUN pip install --no-cache-dir -r requirements.txt
COPY ./ /usr/src/app

EXPOSE 80

# CMD ["python", "manage.py", "runserver", "0.0.0.0:80"]
CMD ["gunicorn", "pizzaclub.wsgi:application", "--bind", "0.0.0.0:80"]
