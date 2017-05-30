FROM node:6
RUN apt-get update
# RUN apt-get install nginx

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install -q -D
COPY . /usr/src/app

ENV PORT 5000

CMD [ "node", "server.js" ]
