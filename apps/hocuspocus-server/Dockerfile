FROM node:22-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="${PNPM_HOME}:${PATH}"

RUN npm install -g pnpm

FROM base AS builder

RUN apk update && apk add --no-cache libc6-compat

WORKDIR /app

RUN pnpm add -g turbo@latest

COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
COPY package.json ./
COPY turbo.json ./
COPY apps/hocuspocus-server ./apps/hocuspocus-server
COPY packages ./packages

RUN turbo prune hocuspocus-server --docker

COPY . .

FROM base AS installer

RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY --from=builder /app/out/json/ ./
COPY --from=builder /app/out/full/ ./
RUN pnpm install --frozen-lockfile

RUN pnpm turbo run build --filter=hocuspocus-server

RUN pnpm --filter=packages/db exec npx prisma generate

FROM base AS runner

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 hocuser
USER hocuser

COPY --from=installer --chown=hocuser:nodejs /app/apps/hocuspocus-server/dist ./apps/hocuspocus-server/dist
COPY --from=installer --chown=backenduser:nodejs /app/apps/hocuspocus-server/node_modules ./apps/hocuspocus-server/node_modules
COPY --from=installer --chown=backenduser:nodejs /app/packages/db/prisma ./packages/db/prisma
COPY --from=installer --chown=backenduser:nodejs /app/packages/db/node_modules ./packages/db/node_modules
COPY --from=installer --chown=hocuser:nodejs /app/node_modules ./node_modules
COPY --from=installer --chown=hocuser:nodejs /app/packages ./packages

CMD ["node", "apps/hocuspocus-server/dist/index.js"]











