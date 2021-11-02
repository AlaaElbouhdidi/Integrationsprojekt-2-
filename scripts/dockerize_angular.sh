#!/bin/sh

IMAGE="integrationsprojekt2/frontend"

docker build --no-cache -t "$IMAGE" .

docker run -d -p 4200:80 "$IMAGE":latest

echo "http://localhost:4200"

