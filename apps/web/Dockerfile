FROM node:22-alpine

WORKDIR /app

COPY package.json ./package.json
COPY packages ./packages
COPY pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY apps/web ./apps/web

RUN npm install -g pnpm

RUN pnpm install

WORKDIR /app/apps/web

RUN pnpm build

EXPOSE 3000

CMD [ "pnpm", "start" ]