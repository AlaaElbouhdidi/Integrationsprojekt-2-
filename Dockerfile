FROM node:14-alpine AS build

WORKDIR /app

COPY . .

RUN npm install -g @angular/cli && \
    npm install && \
    npm run test && \
    ng build --configuration development

FROM nginx

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/dist /usr/share/nginx/html
