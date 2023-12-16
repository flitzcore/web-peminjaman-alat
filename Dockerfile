FROM node:21

WORKDIR /app

RUN chmod +x /entrypoint.sh

ADD . .

RUN npm install

EXPOSE 8080

CMD ["npm", "run", "dev"]