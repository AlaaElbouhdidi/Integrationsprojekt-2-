#!/bin/sh

npm ci
npm run build
npm ci --prefix server
npm run --prefix server build

