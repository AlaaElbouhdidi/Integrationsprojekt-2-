FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm i -g nx \
    npm ci \
    nx build api

COPY . .

EXPOSE 8000

CMD ["node", "dist/apps/api/main.js"]
