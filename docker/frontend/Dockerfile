FROM node:18.16.1 as build

WORKDIR /app

COPY package*.json ./

RUN npm ci

RUN npm install -g @angular/cli

COPY . .

RUN npm run build --configuration=production

FROM nginx:latest

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/dist/scent-quest-ui/browser /usr/share/nginx/html

EXPOSE 80