FROM node:12.7-alpine AS build
RUN mkdir -p /src/app/
WORKDIR /src/app
ENV PATH /src/app/node_modules/.bin:$PATH
COPY package.json /src/app/
RUN npm install
COPY . /src/app
RUN npm run build

FROM nginx:1.15.8-alpine
COPY --from=build /src/app/build  /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]`