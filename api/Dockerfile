FROM node:14.16.0-alpine3.10 as development

WORKDIR /api

COPY ./api/package*.json ./

RUN npm install 

# Do it in docker-compose 
# VOLUME [ ".:/app", "/app/node_modules" ]

EXPOSE 3001


CMD npm run start:dev



FROM node:14.16.0-alpine3.10 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /api

COPY ./api/package*.json ./


RUN npm install
RUN npm install --only=dev

COPY ./api .

RUN npm run build

EXPOSE 3001


CMD npm run start