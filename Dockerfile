# base image
FROM node:16-alpine

RUN mkdir -p /usr/src

WORKDIR /usr/src

COPY ./package.json /usr/src/
COPY ./package-lock.json /usr/src/
COPY ./dist /usr/src/dist

RUN npm install

EXPOSE 3001

CMD npm run start