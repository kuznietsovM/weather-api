FROM node:22-alpine as build

WORKDIR /app
COPY package.json tsconfig.json tsconfig.build.json yarn.lock ./
RUN yarn

COPY nest-cli.json nest-cli.json 

COPY src src

ENTRYPOINT yarn start:dev