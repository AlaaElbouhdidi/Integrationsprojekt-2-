#!/bin/sh

IMAGE="integrationsprojekt2/backend"

docker build --no-cache -t "$IMAGE" -f server/Dockerfile .

docker run -d -p 8000:8000/tcp "$IMAGE":latest

echo "http://localhost:8000"

