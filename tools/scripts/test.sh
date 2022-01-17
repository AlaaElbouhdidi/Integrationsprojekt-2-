#!/bin/sh

tsc -p tools/tsconfig.tools.json &&
npm run format:check &&
node ./tools/scripts/run-many.js build "$CI_NODE_INDEX" "$CI_NODE_TOTAL" "$CI_COMMIT_REF_SLUG" &&
node ./tools/scripts/run-many.js lint "$CI_NODE_INDEX" "$CI_NODE_TOTAL" "$CI_COMMIT_REF_SLUG" &&
npx compodoc -p apps/mate-team/tsconfig.compodoc.json -d dist/apps/api/docs/mate-team/ &&
node ./tools/scripts/run-many.js test "$CI_NODE_INDEX" "$CI_NODE_TOTAL" "$CI_COMMIT_REF_SLUG" &&
node ./tools/scripts/run-many.js e2e "$CI_NODE_INDEX" "$CI_NODE_TOTAL" "$CI_COMMIT_REF_SLUG" &&
echo "Looking good, pipeline is likely going to succeed!"
