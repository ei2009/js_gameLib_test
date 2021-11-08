#!/bin/bash

yarn add -D webpack@latest webpack-cli@latest webpack-dev-server@latest
yarn add -D ts-loader@latest typescript@latest typesync@latest

cp ../.prettierrc .
cp ../webpack.config.js .
yarn tsc --init

echo '"build": "webpack --mode=production",
"start": "webpack serve --mode=development"'
