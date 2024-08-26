FROM python:3
ENV PYTHONUNBUFFERED=1
WORKDIR /usr/src/backend
COPY requirements.txt /usr/src/backend/
RUN pip install -r requirements.txt
COPY . /usr/src/backend/
EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]