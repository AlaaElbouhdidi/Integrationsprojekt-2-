#!/bin/sh

npm run format:check &&
npx nx affected --base=HEAD~1 --target=build --parallel --max-parallel=3 &&
npx nx affected --base=HEAD~1 --target=lint --parallel --max-parallel=3 &&
npx nx affected --base=HEAD~1 --target=compodoc --parallel --max-parallel=3 &&
npx nx affected --base=HEAD~1 --target=test --parallel --max-parallel=3 &&
npx nx affected --base=HEAD~1 --target=e2e &&

echo "Looking good, pipeline is likely going to succeed!"
