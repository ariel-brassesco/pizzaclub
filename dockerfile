FROM python:3.8.5
ENV PYTHONUNBUFFERED=1
RUN mkdir /code
WORKDIR /code
COPY requirements.txt /code/
RUN pip install -r requirements.txt
COPY . /code/
EXPOSE 8000
CMD ["gunicorn pizzaclub.wsgi:application --bind 0.0.0.0:8000"]
