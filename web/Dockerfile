FROM node:16-alpine AS development
WORKDIR /usr/src/app

COPY . .

RUN npm ci

FROM nginx:alpine AS production

COPY --from=development /usr/src/app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
