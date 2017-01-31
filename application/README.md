# application
This is a sample backend application that connects to a database of songs and authors. It can rate and retrieve songs. Doesn't have much tricks, unless you combine it with some bash magic.

## Environment Variables
This application gets all of its variable configurations through environment variables. Below are all of the Environment variables that will change the behaviour of this program. You can take a look at the [.env.example](./.env.example) file for default values.

- `DATABASE_CONFIGURATION` holds the database configuration in **json** format. The json string is parsed and directly passed to `mysql2` contstructor.
- `LISTEN_PORT` defines the port that this application's express server will listen on. **number**

## Dockerfiles
There are 2 Dockerfiles that come with this application. [Dockerfile](./Dockerfile) is the default file. This file creates a docker image that includes all of the source code and required packages. It can be pushed to any Docker repository to be run on Container Runtimes. Or any other machine that doesn't have the source code for this program. 

[Dockerfile-Development](./Dockerfile-development) is the Dockerfile that builds a docker image which doesn't have the source code of this applications inside. It is intended to be used in local development, where you have the source code of this application. It features hot-reloading and auto-restarting.

## Checking if application works
You can go to [http://localhost:8080/healtz](http://localhost:8080/healtz). To check if the container started successfully. Please replace localhost with the ip address of your docker host.

### Bash Magic
After running the service, run the below command to listen to one of my favorites songs!
```
curl localhost:8080/song/get --silent | grep -Po '_id":"[a-zA-Z0-9_-]+' | sort -R | head -1 | cut -c 7- | xargs -iID xdg-open "https://youtube.com/watch?v=ID"
```