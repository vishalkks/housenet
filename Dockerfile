FROM ubuntu:16.04

ENV PORT 5000
ENV HOST 0.0.0.0

EXPOSE 5000

RUN apt update && \
    apt install -y python3-pip

COPY ./requirements.txt /app/requirements.txt

WORKDIR /app

RUN pip3 install -r requirements.txt

COPY . /app

ENTRYPOINT [ "python3" ]

CMD [ "app.py" ]