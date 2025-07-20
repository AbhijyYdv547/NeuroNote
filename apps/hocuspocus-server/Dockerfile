FROM node:22-alpine

WORKDIR /app

# Install dependencies
COPY . .

RUN npm install -g pnpm 

RUN pnpm install

# Copy backend app and shared code
WORKDIR /app/apps/hocuspocus-server

EXPOSE 1234

# Run migrations and start server
CMD ["pnpm", "dev"]
