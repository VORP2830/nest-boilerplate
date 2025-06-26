FROM node:23-slim AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:23-slim AS runner

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

RUN npm ci --omit=dev

RUN useradd --user-group --create-home --shell /bin/false appuser
USER appuser

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
