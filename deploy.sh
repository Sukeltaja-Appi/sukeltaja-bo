#!/bin/sh
npm run build
rm -rf ../../sukeltaja-backend/build
cp -r build ../../sukeltaja-backend
