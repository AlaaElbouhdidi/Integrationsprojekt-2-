#!/bin/sh

docker-compose up -d --build

echo "View frontend at http://localhost:4200"
echo "API at http://localhost:8000"
