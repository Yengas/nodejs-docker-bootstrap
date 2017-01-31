# Dockerfile to build `binary` image which will have everything packages like dependenecies and codes.
# This image can be configured and run with environment variables.
FROM mhart/alpine-node:6.9.1

WORKDIR /application

# Add this folder into /application.
ADD . .
# Install all dependencies.
RUN npm install

# Indicate that we use 8080. Maybe configurable.
EXPOSE 8080

# Start the application.
CMD ["/usr/bin/node", "/application/bin/index.js"]