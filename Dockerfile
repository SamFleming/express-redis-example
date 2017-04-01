FROM node:6-alpine

WORKDIR /app

COPY . /app

CMD ["node", "/app/server.js"]
