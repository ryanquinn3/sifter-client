#!/usr/bin/env bash
npm run build
docker build -t ryanquinn3/sifter-client .
docker push ryanquinn3/sifter-client
