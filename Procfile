# Web process for serving the Next.js application
web: npm run dev
#web: node .next/standalone/server.js

# Release phase for database migrations and build steps
release: npx prisma migrate deploy && npm run build

# Worker process for background jobs (if needed)
worker: node workers/index.js

# Scheduler for periodic tasks (if needed)
scheduler: node schedulers/index.js