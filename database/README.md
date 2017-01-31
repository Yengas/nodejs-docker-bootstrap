# database
This folder creates a MariaDB image that has a backup database built into it. Every container will start with this backup database unless you mount its `/var/lib/mysql` to a persistent storage.

## Building
Below is a example build command sequence.
```
docker build -t yengas/node-demo-database:latest .
docker push yengas/node-demo-database:latest
# Now you can use `docker pull` or `docker run` on any machine
# that has access to the docker repository you pushed this image to
```
