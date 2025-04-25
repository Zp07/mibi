FROM node:18

WORKDIR /app

COPY package*.json ./

RUN pnpm install --no-cache-dir

COPY . .

CMD [ "node", "index.js" ]