FROM node:12.7-alpine AS build
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install @angular/cli -g
COPY . .
RUN npm run build
