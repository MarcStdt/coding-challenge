# pull official base image
FROM node:16 AS builder

# set working directory
WORKDIR /app


# install app dependencies
#copies package.json and package-lock.json to Docker environment
COPY package.json ./

# Installs all node packages
RUN npm install 

# Copies everything over to Docker environment
COPY . ./
RUN npm run build
ENV BIND_HOST="0.0.0.0"

#start node webserver
CMD ["node", "/app/build/server.js"]