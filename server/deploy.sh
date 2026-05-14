#!/bin/bash

echo "--=======Starting=======--";

echo "--=======stopping dockers=======--";
docker-compose down -v
# docker-compose stop
echo "--=======done=======--";

echo "--=======removing images and containers=======--";
yes | sudo docker image prune
yes | sudo docker container prune
yes | sudo docker rmi -f $(docker images -aq)
echo "--=======done =======--";

echo "--=======pulling=======--";
git pull origin server
echo "--=======done=======--";

echo "--=======starting docker images=======--";
docker-compose up -d --build
echo "--=======Done=======--"

