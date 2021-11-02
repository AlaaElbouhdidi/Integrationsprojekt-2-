#!/bin/sh

COMMIT="$(git rev-parse --short HEAD)"

IMAGE="git-registry.thm.de/cbkr81/integrationsprojekt-2/backend:$COMMIT"

docker build --no-cache -t "$IMAGE" -f server/Dockerfile .

docker push "$IMAGE"
