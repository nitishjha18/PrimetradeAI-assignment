"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const adapter_pg_1 = require("@prisma/adapter-pg");
const client_1 = require("@prisma/client");
const adapter = new adapter_pg_1.PrismaPg({
    connectionString: process.env.DATABASE_URL,
});
const prisma = new client_1.PrismaClient({
    adapter,
    log: process.env.NODE_ENV !== "production" ? ["error", "warn"] : ["error"],
});
exports.default = prisma;
//# sourceMappingURL=prisma.js.map