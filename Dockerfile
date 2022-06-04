FROM node:14
ENV NODE_ENV production
WORKDIR /usr/src
COPY package*.json ./
RUN yarn
COPY . .
EXPOSE 8080
CMD [ "npx", "ts-node", "server" ]
