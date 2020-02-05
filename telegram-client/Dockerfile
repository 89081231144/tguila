FROM node:10-alpine as builder
WORKDIR /usr/src
RUN apk update && apk upgrade && \
		apk add --update alpine-sdk linux-headers git zlib-dev openssl-dev gperf php php-ctype cmake && \
		git clone https://github.com/tdlib/td.git && \
		cd td && git checkout v1.5.0
WORKDIR /usr/src/td
RUN sed -e '17i#if TD_FREEBSD || TD_OPENBSD || TD_NETBSD' -e '18i#endif' ./tdutils/td/utils/port/detail/ThreadPthread.cpp > ./tdutils/td/utils/port/detail/ThreadPthread.tmp && \
	mv -f ./tdutils/td/utils/port/detail/ThreadPthread.tmp ./tdutils/td/utils/port/detail/ThreadPthread.cpp && \
	rm -rf build && mkdir build
WORKDIR /usr/src/td/build
RUN export CXXFLAGS="" && cmake -DCMAKE_BUILD_TYPE=Release -DCMAKE_INSTALL_PREFIX:PATH=../tdlib ..
RUN cmake --build . --target prepare_cross_compiling && cd .. && php SplitSource.php
RUN cmake --build . --target install && cd .. && php SplitSource.php --undo
WORKDIR /usr/src/app
RUN apk add --no-cache python make g++
RUN npm i airgram express morgan
FROM node:10-alpine as app
ENV APP_ID=555438
ENV APP_HASH=c3dc9ca0de3dd9088dc788344e59460b
ENV TDLIB_COMMAND=/usr/lib/libtdjson
ENV DATABASE_DIRECTORY=telegram-db
ENV APP_PORT=3333
ENV ENABLE_STORAGE_OPTIMIZER=false
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/node_modules/ node_modules
COPY --from=builder /usr/src/td/tdlib/lib/ /usr/lib
COPY src src
VOLUME /usr/src/app/$DATABASE_DIRECTORY
#VOLUME /usr/src/app/$DATABASE_DIRECTORY/animations
#VOLUME /usr/src/app/$DATABASE_DIRECTORY/documents
#VOLUME /usr/src/app/$DATABASE_DIRECTORY/music
#VOLUME /usr/src/app/$DATABASE_DIRECTORY/passport
#VOLUME /usr/src/app/$DATABASE_DIRECTORY/photos
#VOLUME /usr/src/app/$DATABASE_DIRECTORY/profile_photos
#VOLUME /usr/src/app/$DATABASE_DIRECTORY/secret
#VOLUME /usr/src/app/$DATABASE_DIRECTORY/secret_thumbnails
#VOLUME /usr/src/app/$DATABASE_DIRECTORY/stickers
#VOLUME /usr/src/app/$DATABASE_DIRECTORY/temp
#VOLUME /usr/src/app/$DATABASE_DIRECTORY/thumbnails
#VOLUME /usr/src/app/$DATABASE_DIRECTORY/video_notes
#VOLUME /usr/src/app/$DATABASE_DIRECTORY/videos
#VOLUME /usr/src/app/$DATABASE_DIRECTORY/voice
#VOLUME /usr/src/app/$DATABASE_DIRECTORY/wallpapers
EXPOSE 3333
#ENTRYPOINT ["node", "./src/server.js"]
