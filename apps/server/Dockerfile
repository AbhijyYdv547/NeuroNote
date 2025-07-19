FROM node:22-alpine

WORKDIR /app

# Install dependencies
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./

COPY apps/server/package.json ./apps/server/package.json

RUN npm install -g pnpm && pnpm install

# Copy backend app and shared code
COPY . .

EXPOSE 3001

# Run migrations and start server
CMD ["sh", "./start.sh"]
