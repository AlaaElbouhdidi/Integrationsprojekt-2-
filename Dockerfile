FROM node:14

ENV PORT 8000
ENV HOST 0.0.0.0

WORKDIR /app

COPY . .

RUN npm i -g nx && \
    npm ci && \
    nx run-many --target=compodoc --all=true --skip-nx-cache && \
    nx run-many --target=build --all=true --skip-nx-cache

CMD ["node", "dist/apps/api/main.js"]
