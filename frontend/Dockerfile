FROM node:20-alpine

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/* && rm -rf /etc/nginx/conf.d/default.conf && rm -rf /etc/nginx/nginx.conf

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=0 /app/build /usr/share/nginx/html

EXPOSE 3000