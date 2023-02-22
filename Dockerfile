# Build step #1: build the React front end
FROM node:16-alpine as build-step
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY /app/package.json ./
COPY /app/src src
COPY /app/public public
RUN npm install 
RUN npm run build

# Build step #2: build the Python back end
FROM python:3.8.0-slim

# Sets the working directory
WORKDIR /app
COPY --from=build-step /app/build ./build

# Upgrade PIP
RUN pip install --upgrade pip

RUN apt-get update && apt install software-properties-common -y
RUN add-apt-repository ppa:deadsnakes/ppa -y
RUN apt install -y build-essential
RUN apt-get -y install libpq-dev

RUN mkdir ./api
COPY /api api/
RUN pip install -r ./api/requirements.txt

# Set $PORT environment variable
ENV PORT 8080

# Run the web service on container startup
WORKDIR /app/api
CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 app:app