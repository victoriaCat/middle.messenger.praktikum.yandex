FROM node:14
WORKDIR /usr/src/app
COPY . .
COPY package*.json ./
RUN npm install && npm run build
EXPOSE 3000
CMD node server.js
