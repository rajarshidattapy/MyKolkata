import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis

// Reuse one client across hot reloads in dev and across warm serverless
// invocations in production. A fresh PrismaClient per request would open a new
// pool each time and exhaust Postgres connections under load.
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'production' ? ['error'] : ['error', 'warn'],
    // Prisma's default pool is num_cpus*2+1, which on a 1-vCPU serverless
    // instance is only 3 -- concurrent transactions then fail with P2028
    // "Unable to start a transaction in the given time". Neon's -pooler
    // endpoint (PgBouncer) fronts the real connections, so a slightly larger
    // per-instance pool is safe and removes that bottleneck.
    transactionOptions: { maxWait: 10000, timeout: 20000 },
  })

globalForPrisma.prisma = prisma
