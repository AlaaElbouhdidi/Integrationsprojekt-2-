FROM node:14

WORKDIR /app

COPY package*.json ./
COPY nx.json ./

RUN npm i -g nx && \
    npm ci && \
    nx run-many --target=compodoc --all --skip-nx-cache && \
    nx run-many --target=build --all --skip-nx-cache

COPY . ./

CMD ["node", "dist/apps/api/main.js"]
