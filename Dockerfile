FROM node:14-alpine AS build

WORKDIR /app

COPY / ./
COPY package*.json ./

RUN npm install -g @angular/cli && \
    npm install && \
    npm run test && \
    ng build

FROM nginx

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/dist /usr/share/nginx/html
