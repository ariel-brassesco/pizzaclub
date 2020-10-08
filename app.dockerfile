FROM node:10 as build

WORKDIR /src
COPY ./frontend/package*.json ./
RUN npm ci
COPY ./frontend ./
RUN npm run build


FROM nginx as deploy

RUN mkdir /app
COPY ./nginx/app.conf /etc/nginx/conf.d/default.conf
COPY --from=build /src/build /app
