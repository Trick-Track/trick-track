# syntax=docker/dockerfile:1

FROM python:3.8-slim-buster

ARG NODE_VERSION

WORKDIR /app

RUN apt-get update && \
  DEBIAN_FRONTEND=noninteractive apt-get install -yq \
    libpq-dev \
    python-dev \
    gcc \
    curl \
    lsof \
    htop

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

RUN . /root/.nvm/nvm.sh \
  && nvm install $NODE_VERSION \
  && nvm alias default $NODE_VERSION \
  && nvm use default

ENV PATH /root/.nvm/versions/node/v$NODE_VERSION/bin:$PATH

COPY requirements.txt requirements.txt
RUN python -m pip install --upgrade pip
RUN pip install -r requirements.txt
