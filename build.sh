#!/bin/sh

npm ci
npm run build
cd server || exit
npm ci
npm run build

