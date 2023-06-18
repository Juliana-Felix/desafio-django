FROM node:lts-alpine

RUN npm install -g http-server

ENV HOST 0.0.0.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD [ "npm", "start" ]