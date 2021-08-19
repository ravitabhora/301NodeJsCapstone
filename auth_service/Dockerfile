FROM node:14
ENV NODE_VERSION 12.22.4
WORKDIR /auth_service
COPY package*.json /auth_service
RUN npm install
COPY . /auth_service
EXPOSE 4002
CMD [ "npm", "start" ]