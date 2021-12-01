FROM node:14 as build

ENV PORT 8000
ENV HOST 0.0.0.0

WORKDIR /app

COPY . ./

RUN npm i -g nx && \
    npm ci

RUN nx run-many --target=compodoc --all --skip-nx-cache && \
    nx build && \
    nx build api

CMD ["node", "dist/apps/api/main.js"]
