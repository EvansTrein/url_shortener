FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

COPY ./local.env ./

ENV $(cat local.env | xargs)

CMD ["npm", "run", "dev"]