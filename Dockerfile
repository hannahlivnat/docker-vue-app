FROM node:lts-alpine
RUN npm install -g http-server

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8080
CMD [ "http-server", "dist" ]

# ==============================================
# To Build and Run Image: 
# docker build -t hannahlivnat/docker-vue-app .
# docker run -it -p 8080:8080 --rm --name 
# dockerize-application hannahlivnat/docker-vue-app
# Go to localhost:8080 to run server
# ==============================================
