FROM ubuntu:20.04


ENV PORT 8080
ENV HOST 127.0.0.1

EXPOSE 8080

RUN apt-get update && apt install software-properties-common -y
RUN add-apt-repository ppa:deadsnakes/ppa -y
RUN apt update && \
    apt install -y python3.9 python3-pip 
RUN apt-get -y install libpq-dev

COPY ./requirements.txt /app/requirements.txt

WORKDIR /app

RUN pip3 install -r requirements.txt

COPY . /app

ENTRYPOINT [ "python3" ]

CMD [ "app.py", "prod", "&" ]