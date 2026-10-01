# --- Build Stage ---
FROM node:20-alpine AS builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@10.15.1

# Copy dependency files and patches
COPY package.json pnpm-lock.yaml ./
COPY patches ./patches

# Install all dependencies (including devDependencies for building)
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the client SPA and bundle the Express server
RUN pnpm build

# --- Production Runner Stage ---
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8080

# Install pnpm
RUN npm install -g pnpm@10.15.1

# Copy package.json to run scripts and patches
COPY package.json pnpm-lock.yaml ./
COPY patches ./patches

# Install only production dependencies
RUN pnpm install --prod --frozen-lockfile

# Copy built dist files (contains dist/index.js and dist/public)
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 8080

# Start server
CMD ["node", "dist/index.js"]
