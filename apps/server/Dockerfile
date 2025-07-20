FROM node:22-alpine

WORKDIR /app

# Install dependencies
COPY package.json ./package.json
COPY packages ./packages
COPY pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY apps/server ./apps/server

RUN npm install -g pnpm 

RUN pnpm install

# Copy backend app and shared code
RUN chmod +x apps/server/start.sh

WORKDIR /app/apps/server

EXPOSE 3001

# Run migrations and start server
CMD ["sh", "./start.sh"]
