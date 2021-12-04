#!/bin/sh

npm run format:check &&
NX_CLOUD_DISTRIBUTED_EXECUTION=false npx nx build-functions api &&
npx nx affected --base=HEAD~1 --target=build --parallel --max-parallel=3 &&
npx nx affected --base=HEAD~1 --target=lint --parallel --max-parallel=3 &&
npx nx affected --base=HEAD~1 --target=compodoc --parallel --max-parallel=3 &&
npx nx affected --base=HEAD~1 --target=test --parallel --max-parallel=3 &&
npx nx affected --base=HEAD~1 --target=e2e --parallel --max-parallel=3 &&

echo "Looking good, pipeline is likely going to succeed!"
