FROM node:12.7-alpine AS build
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
