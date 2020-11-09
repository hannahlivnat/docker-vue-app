# BUILD STAGE
FROM node:lts-alpine as build-stage
#RUN npm install -g http-server
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# PRODUCTION STAGE
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]

# ========================================================
# https://vuejs.org/v2/cookbook/dockerize-vuejs-app.html
# Build and Run Image with NGINX: 
# docker build -t hannahlivnat/docker-vue-app .
# docker run -p 8080:80 hannahlivnat/docker-vue-app
# go to localhost:8080 to run server
# ========================================================



