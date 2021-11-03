#!/bin/sh

npm run format &&
npm run lint &&
npm run doc:coverage &&
npm run test &&
npm run test:cy:run &&
npm run --prefix server format &&
npm run --prefix server lint &&
npm run --prefix server doc:coverage &&
npm run --prefix server test &&
npm run --prefix server test:e2e
