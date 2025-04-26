FROM node:18

WORKDIR /app/api

COPY package*.json ./

RUN npm install -g pnpm \
    && pnpm install --no-cache

COPY . .

CMD [ "npm", "start" ]