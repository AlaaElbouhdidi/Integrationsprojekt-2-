FROM node:14-alpine

WORKDIR /app

COPY . .

WORKDIR /app/server

RUN npm install -g @nestjs/cli && \
    npm install && \
    npm run test && \
    npm run build

EXPOSE 8000

CMD ["npm", "run", "start"]
