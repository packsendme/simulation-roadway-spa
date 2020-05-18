FROM node:12.7-alpine AS build
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY .  /usr/src/app/
RUN npm install @angular/cli -g
RUN npm i
RUN ng build --prod