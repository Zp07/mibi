FROM node:18

WORKDIR /app/api

COPY package*.json ./

RUN npm install -g npm

COPY . .

CMD [ "npm", "start" ]