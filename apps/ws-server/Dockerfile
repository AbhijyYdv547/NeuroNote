FROM node:22-alpine

WORKDIR /app

# Install dependencies
COPY . .

RUN npm install -g pnpm 

RUN pnpm install

RUN chmod +x apps/ws-server/start.sh

WORKDIR /app/apps/ws-server

EXPOSE 8080

# Run migrations and start server
CMD ["sh", "./start.sh"]
