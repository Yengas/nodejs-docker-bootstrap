# Dockerfile to build `binary` image which will have everything packages like dependenecies and codes.
# This image can be configured and run with environment variables.
FROM node:9.4.0-alpine as builder

# Add build tools necessary for npm installations.
RUN apk add --no-cache make gcc g++ python

WORKDIR /application

# Add package.json for dependency installation.
ADD ./package.json ./package.json
# Install all dependencies.
RUN npm install --only=production

# Release docker image
# As the last stage.
FROM node:9.4.0-alpine as release

WORKDIR /application

# Add the codes and other stuff to the application folder.
ADD . .
# Remove node_modules older just in case..
RUN rm -rf /application/node_modules
# Copy the dependency installation from the builder image.
COPY --from=builder /application/node_modules /application/node_modules

# Indicate that we use 8080. Maybe configurable.
EXPOSE 8080

# Start the application.
CMD ["node", "/application/bin/index.js"]
