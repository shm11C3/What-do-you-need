FROM node:16.15.0-buster

WORKDIR /app

RUN apt-get update && apt-get upgrade -y && \
    npm install -g npm@8.13.2  && \
    npm install -g @vue/cli

RUN chown -R node:node /root

USER node

RUN mkdir /root/.cache

