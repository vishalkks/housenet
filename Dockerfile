FROM ubuntu:20.04


ENV PORT 5000
ENV HOST 0.0.0.0

EXPOSE 5000

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

CMD [ "app.py" ]