FROM node:12.13-alpine As development

WORKDIR /frontend

COPY ./frontend/package*.json ./


RUN npm install 



CMD npm run dev

EXPOSE 3000


FROM node:12.13-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY ./frontend/package*.json ./

RUN npm install
RUN npm install --only=dev

COPY . .

RUN npm run build 

EXPOSE 3002


CMD npm run start
