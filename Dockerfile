FROM node:14

ENV PORT 8000
ENV HOST 0.0.0.0

WORKDIR /app

COPY package*.json ./

RUN npm i -g nx \
    npm ci \
    nx build api

COPY . .

CMD ["node", "dist/apps/api/main.js"]
