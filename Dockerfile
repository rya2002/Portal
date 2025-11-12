# ===============================
# MULTI-MODE (DEV / PROD)
# ===============================
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install

# Copia o restante do código
COPY . .

ARG MODE=development
ENV NODE_ENV=$MODE

# Porta padrão do Vite (dev) ou app (prod)
EXPOSE 5173

# Se for dev, roda vite dev; se for prod, faz build e serve
CMD if [ "$MODE" = "development" ]; then \
      npm run dev -- --host; \
    else \
      npm run build && npm run preview -- --host; \
    fi