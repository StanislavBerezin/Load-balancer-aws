# Instructions for delpoment on EC2 instance

1. ssh into your EC2 instance
2. in terminal type "nano run.sh"
   A window is now opened in which you need to write

```
#!/bin/bash

sudo curl -fsSL https://get.docker.com/ | sh

sudo curl -L "https://github.com/docker/compose/releases/download/1.22.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose
```

3. Then press ctrl+x => press on `y` (to save it)
4. In terminal type `chmod +x run.sh` and then type `./run.sh` it should install everything required
5. In terminal type `nano docker-compose.yml`
   A window pops up, and write

```
version: "3"
services:
  nginx:
    restart: always
    image: "coconicola/nginx"
    ports:
      - "3000:80"
    depends_on:
      - api
      - client
      - socket
  api:
    image: "coconicola/server"
  client:
    image: "coconicola/client"
  socket:
    image: "coconicola/socket"
```

I'm assuming you have exposed port 3000 when creating your EC2 instance

6. Then press ctrl+x => press on `y` (to save it)
7. sudo docker-compose up --build

8. Should be deployed now

# Instructions for local development

Note: Im assuming you are on linux for local development

1. If dont have docker-compose on your local pc, repeat steps 1-4 on your machine
2. Navigate to folder containing this project in terminal and type `docker-compose up --build`, should start now

If permission problems arise in step 2, then type `sudo docker-compose up --build`
