FROM node:16-slim
ENV NODE_ENV production
WORKDIR /usr/src
COPY package*.json ./
RUN yarn
COPY . .
EXPOSE 8080
CMD [ "yarn", "start" ]
