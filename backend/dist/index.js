"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const swagger_1 = __importDefault(require("./config/swagger"));
const v1_1 = __importDefault(require("./routes/v1"));
const error_middleware_1 = __importDefault(require("./middlewares/error.middleware"));
const prisma_1 = __importDefault(require("./lib/prisma"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
const authLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message: "Too many requests, please try again later",
});
app.use("/api/v1/auth", authLimiter);
// API Routes
app.use("/api/v1", v1_1.default);
// Swagger Documentation
app.use("/api/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
// Global Error Handling
app.use(error_middleware_1.default);
// Server Start
const PORT = process.env.PORT || 5000;
const startServer = async () => {
    try {
        // Connect to Prisma
        await prisma_1.default.$connect();
        console.log("✓ Database connected");
        // Listen on port
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};
startServer();
// Graceful shutdown
process.on("SIGINT", async () => {
    await prisma_1.default.$disconnect();
    process.exit(0);
});
//# sourceMappingURL=index.js.map