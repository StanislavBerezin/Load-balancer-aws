# (1) Start production
On your local machine
TO build
- 1.1) ```docker login``` enter your credentials
- 1.2) ```docker build -t (yourDocHubName)/client .```
- 1.3)```docker build -t (yourDocHubName)/nginx .```
- 1.4)```docker build -t (yourDocHubName)/server .```

To push
- 1.5) ```docker push (yourDocHubName)/client```
- 1.6) ```docker push (yourDocHubName)/nginx```
- 1.7) ```docker push (yourDocHubName)/server```
All of these will push images to docker hub on your profile

# (2) Create EC2 instance on Amazon
- 2.1) Get inside of the instance
- 2.2) ```sudo curl -fsSL https://get.docker.com/ | sh ``` to install docker
- 2.3) ```sudo curl -L "https://github.com/docker/compose/releases/download/1.22.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose``` to install docker compose
- 2.4)```sudo chmod +x /usr/local/bin/docker-compose``` give access
- 2.5) Create ```docker-compose.yml``` with the following code:
```
version: '3'
services:
  nginx:
    restart: always
    image: 'coconicola/nginx'
    ports:
      - '2000:80'
  api:
    image: 'coconicola/server'
  client:
    image: 'coconicola/client'

```

replace coconicola with your username

- 2.6) ```sudo docker-compose up --build ``` will start the server


# Possible issues

1) Might not load if you setup the port incorrectly in step 2.5 under nginx, the reason its port ```2000``` its because it was setup during ES2 instance creation, so change accordingly
2) You might need to do ```docker login``` to push and retrieve images
3) Install docker and docker compose
```
sudo curl -fsSL https://get.docker.com/ | sh

sudo curl -L "https://github.com/docker/compose/releases/download/1.22.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose
```
after dont forget to login ```docker login```

4) If need to transfer scripts from local PC to EC2 instance
```scp -i [secretfile.pem] [whatToTranfsfer] [connections]us-west-2.compute.amazonaws.com:~[path]```
