#!/bin/sh

COMMIT="$(git rev-parse --short HEAD)"

IMAGE="git-registry.thm.de/cbkr81/integrationsprojekt-2/frontend:$COMMIT"

docker build --no-cache -t "$IMAGE" .

docker push "$IMAGE"
