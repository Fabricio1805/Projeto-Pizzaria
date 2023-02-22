#!/bin/bash

npm install

npm i --save-dev prisma@latest
npm i @prisma/client@latest

npx prisma generate


npx prisma migrate dev --name init

npm run dev
