FROM node:12.7-alpine AS build
COPY . ./simulation-roadway-spa
WORKDIR /simulation-roadway-spa
RUN npm i
RUN $(npm bin)/ng build --prod

FROM nginx:1.15.8-alpine
COPY --from=build-stage /simulation-roadway-spa/dist/simulation-roadway-spa/ /usr/share/nginx/html