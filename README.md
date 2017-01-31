# nodejs-docker-bootstrap
This is a sample project that implements a basic Nodejs rest api server that uses Mariadb. It shows a way of Dockerizing a Nodejs application to run on local or a production environment.

For a detailed explanation of choices made in this project, please see [the article](https://yengas.github.io/docker-compose-node/).

It features:
- auto restarting
- pre-populating a database
- building a packaged/runnable Docker image
- service discovery  with Docker 
- persisting data with Docker named volumes

## Three ways to run this application
This application is very flexible in terms of how you can run it. Below are three different ways to run this application. Check [application/README.md](./application/) after running this project to see which endpoints are avaliable.

### 1. On a local working environment with auto restarting
[docker-compose.yml](./docker-compose.yml) file located at the root of this application is configured to run both the backend application and a Mariadb instance. You can use `docker-compose up` to run the project and access it through [http://localhost:8080](http://localhost:8080). The docker-compose file also exposes the port `3306` of the Mariadb application, so you can connect to it with a database client.
 
You can use `docker-compose down` command to stop and remove the containers started this way. If you would like to put the Mariadb database back to its initial state, use `docker-compose down -v` this command will remove the named volume created by the docker-compose file and Mariadb will import the sql files located at [database/backup](./database/backup) once you run `docker-compose up` again.  

The backend server will restart until the database initializes and accepts connections. It will also restart every time you make a change on the source code of the project. However you need to run `docker-compose build` after you've made a change to your **package.json**.

#### Example
```
# cd nodejs-docker-bootstrap
docker-compose up
# On another terminal
curl http://localhost:8080/healthz
# If you would like to re-initialize the database next time you restart...
# run them command: `docker-compose down -v`
```
On **package.json** change, run: `docker-compose down && docker-compose build && docker-compose up`

#### Issues
You may have problems running the project this way because docker-compose tries to link files from docker-compose working directory into docker host containers. If you're running the Docker host in a VirtualBox, you need to make sure the directory we would like to mount is  shared to the VirtualBox. 

Running Docker on Windows with Hyper-V, Docker will warn you to share the disk you're using to the Virtual Machine. If you're running Docker Toolbox, it will be automatically configured for you. In either case, if you get an error about using absolute paths, try setting `COMPOSE_CONVERT_WINDOWS_PATHS` to `1` on the terminal you're working on.

### 2. As a packaged docker image on a container runtime or local
The backend application can be packaged into a docker image that can be run without mounting any source code. You can find an explanation about this on [application/README.md](./application/). If you would like to run the project in a container runtime or if you would like to implement a continuous integration pipeline, this is the way to go.

This project is built and pushed to `docker.io` under the name `yengas/node-demo:latest`. You can either build your own version, or  run:

```
docker run -it --env-file ./application/.env.example --add-host database:192.168.1.105 yengas/node-demo:latest
```

where the `192.168.1.105` points to your database's ip which should be accessible through docker container. For me, this is my computers local ip.

#### Example
Build and push example:

```
# cd nodejs-docker-bootstrap/application
docker build -t yengas/node-demo:latest .
docker run -it yengas/node-demo:latest npm test
docker push yengas/node-demo:latest
```

To run: `docker run -it --env-file ./application/.env.example --add-host database:192.168.1.105 yengas/node-demo:latest`. You could also use the built and pushed image in your container runtime configuration to start instances of this application. Then you could use something like Kubernetes's [ConfigMap](https://kubernetes.io/docs/user-guide/configmap/) to bind environment variables from a dynamic database. You can check the [deployment-sample/kubernetes](./deployment-sample/kubernetes) to see a example configuration.

### 3. On a host machine with Nodejs and dependencies installed
This project uses `.env` files to easily configure docker container environment variables. It also uses a Nodejs module called `dotenv`. This module can populate the `process.env` variable of an application. The entrypoint script of this application is configured to look for a `.env` file under `application/.env` and use it to populate the `process.env`.

Create a `application/.env` with the right configurations and you can just run `node application/bin/index.js` to run this application on any host that has `nodejs` installed!

