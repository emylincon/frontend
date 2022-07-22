# Frontend
Frontend flask application for sensor dashboard.

## To start

First install application requirements
```commandline
pip install -r requirements.txt
```

Then run application
```commandline
python app.py
```

### Note
App listens on port 5000

## Run on kubernetes minikube
* apply k8 manifest
```bash
kubectl apply -f kubernetes.yml
```
* browse url on minikube
```bash
minikube service --url frontend-service
```