# Estagio 1 - Ser� responsavel em construir nossa aplica��o
FROM simulation-costs:0.0.0 as node
WORKDIR /app
COPY package.json /app/
RUN npm i npm@latest -g
RUN npm install
COPY ./ /app/
ARG env=prod
RUN npm run build

# Estagio 2 - Ser� responsavel por expor a aplica��o
FROM nginx:1.13
COPY --from=node /app/dist/meu-projeto /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf