FROM node:18.0-alpine3.15
WORKDIR /usr/app


COPY ["package.json", "package-lock.json*", "./"]
COPY prisma ./prisma/
COPY .env ./
COPY tsconfig.json ./
COPY . .
RUN yarn
RUN npx prisma generate


EXPOSE 3001


CMD yarn dev
