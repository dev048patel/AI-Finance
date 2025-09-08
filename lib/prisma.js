import {PrismaClient} from '../lib/generated/prisma';

export const db = globalThis.prisma || new PrismaClient();

// IT will check if the environment is not production and assign the Prisma client instance to a global variable.
// Production means the live environment where your application is deployed for end-users.
if (process.env.NODE_ENV !== 'production') {
     globalThis.prisma = db;
}

// globalThis.prisma: This global variable ensures that the Prisma client instance is
// reused across hot reloads during development. Without this, each time your application
// reloads, a new instance of the Prisma client would be created, potentially leading
// to connection issues.

