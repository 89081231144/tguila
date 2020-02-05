FROM node:10-alpine as builder
RUN apk update && apk upgrade && apk add --no-cache python make g++
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm i mkdirp@latest && npm i --only=dev
RUN npm i --unsafe-perm -g webpack webpack-cli
RUN mkdir app_modules && \
    cp package*.json app_modules/ && \
    cd app_modules && npm i
COPY .babelrc .babelrc
COPY .env ./
COPY src src
COPY webpack*.js ./
ARG NODE_ENV=production
ARG APP_SERVER_PROTOCOL=http
ENV NODE_ENV=$NODE_ENV
ENV APP_SERVER_PROTOCOL=$APP_SERVER_PROTOCOL
RUN webpack --hide-modules --config=webpack.server.config.js &&  \
    webpack --hide-modules --config=webpack.client.config.js
FROM node:10-alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/app_modules/node_modules node_modules
COPY api-combiners api-combiners
COPY api-requests api-requests
COPY api-responses api-responses
COPY bin bin
COPY --from=builder /usr/src/app/dist/ dist/
COPY public public
COPY src/*.js src/
COPY src/*.html src/
COPY src/*.vue src/
COPY src/router src/
COPY src/store src/
COPY dirname.js ./
COPY .env ./
COPY *.mjs ./
RUN cd public && \
  ln -s /mnt/animations animations && \
  ln -s /mnt/documents documents && \
  ln -s /mnt/profile_photos profile_photos && \
  ln -s /mnt/thumbnails thumbnails && \
  ln -s /mnt/photos photos && \
  ln -s /mnt/videos videos
VOLUME /mnt
VOLUME /usr/src/app/public/.well-known
VOLUME /etc/letsencrypt
EXPOSE 80
ARG NODE_ENV=production
ARG APP_SERVER_PROTOCOL=http
ENV NODE_ENV=$NODE_ENV
ENV APP_SERVER_PROTOCOL=$APP_SERVER_PROTOCOL
ENV DEBUG=telegram-app:*
ENTRYPOINT ["node", "--experimental-modules", "./bin/www.mjs"]
