import { PrismaClient } from "@/app/generated/prisma";

declare global {
  var __prisma: PrismaClient | undefined;
}

// Prevent multiple instances in development
export const prisma = globalThis.__prisma || new PrismaClient();

if (process.env.NODE_ENV === "development") {
  globalThis.__prisma = prisma;
}