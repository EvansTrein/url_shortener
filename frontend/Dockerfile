FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

RUN npm install -g nuxi

COPY . .

RUN npx nuxi build

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/.output .output
COPY --from=builder /app/nuxt.config.ts .
COPY --from=builder /app/package.json .
COPY --from=builder /app/node_modules ./node_modules

CMD ["npx", "nuxi", "start"]