FROM node:12.13-alpine As development

WORKDIR /frontend

COPY ./frontend/package*.json ./


RUN npm install 

EXPOSE 3002
ENV HOST 0.0.0.0

CMD npm run dev



FROM node:12.13-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /frontend

COPY ./frontend/package*.json ./

RUN npm install
RUN npm install --only=dev

COPY ./frontend .


EXPOSE 3002
ENV HOST 0.0.0.0

CMD npm run build  && npm run start
