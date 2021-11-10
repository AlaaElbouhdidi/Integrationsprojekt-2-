#!/bin/sh

npm run format:check &&
nx run-many --target=build --all=true --skip-nx-cache &&
nx run-many --target=lint --all=true --skip-nx-cache &&
nx run-many --target=test --all=true --skip-nx-cache &&
nx run-many --target=compodoc --all=true --skip-nx-cache &&
nx run-many --target=e2e --all=true --skip-nx-cache &&
echo "Looking good, pipeline is likely going to succeed! :)"
