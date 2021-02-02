npx concurrently \
    "tsc --watch" \
    "nodemon dist/index.js --package ../../projects/ng-porcelain/package.json" \
    "nodemon dist/index.js --package ../../projects/ng-porcelain/package.json -c beta" \
    "nodemon dist/index.js --package ../../projects/ng-porcelain/package.json -c beta -c release -c alpha" \
    "nodemon dist/index.js --package ../../projects/ng-porcelain/package.json -c alpha" \
    --names "typescript,release,beta,betaReleaseAlpha,alpha"