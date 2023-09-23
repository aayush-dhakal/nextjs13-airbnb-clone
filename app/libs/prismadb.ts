// we can technically use PrismaClient in every file that we need it, but in next.js 13, next.js creates PrismaClient instance on its every hot reload. so this is a cleaner solution to avoid it
import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default client;
