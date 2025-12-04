FROM node:25.2-bookworm AS builder
WORKDIR /app
COPY package.json package-lock.json /app  
RUN npm install
COPY . /app
RUN npm run build
FROM nginx:alpine AS prod
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]

