FROM node:9.4.0-alpine

# Add build tools necessary for npm installations.
RUN apk add --no-cache make gcc g++ python

# Install global Dependencies
RUN npm install -g nodemon
RUN npm install -g forever

WORKDIR /application

# Add package.json to /application and install project dependencies.
ADD package.json .
RUN npm install

# Remove build tools dependencies...
RUN apk del make gcc g++ python

# Create a volume definition to indicate that we need a mount.
VOLUME /application/code

# Expose the port which is used by the project.
EXPOSE 8080

CMD forever --spinSleepTime 10000 --minUptime 5000 -c "nodemon --exitcrash -L --watch /application/code" /application/code/bin/index.js
