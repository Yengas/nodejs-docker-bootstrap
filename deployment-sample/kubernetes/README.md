# Kubernetes sample
This is a sample Kubernetes configuration for this demo project. Deployment configurations are set to start 3 instances of `backend` application and 1 Mariadb database.

## Usage
Use the commands below to start this application in your Kubernetes cluster.
```
# cd nodejs-docker-bootstrap/deployment-sample
kubectl create namespace demo
kubectl create configmap node-demo --from-file=configs/node-demo --namespace=demo
kubectl apply -f deployment.yml
# It should take a while for your kubernetes cluster to download all the images and start running them.
# Backend pods may fail until the database pod becomes avaliable.
```
