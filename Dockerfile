
FROM node:18 AS builder


RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 5173

CMD ["sh", "-c", "nginx -g 'daemon off;' & disown && exit 0"]
