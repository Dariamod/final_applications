FROM node:alpine AS build

WORKDIR /opt/app

COPY ./package.json .

RUN yarn install

COPY . .

RUN yarn build

FROM nginx
COPY --from=build /opt/app/build /usr/share/nginx/html
