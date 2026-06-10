import "dotenv/config";
import express from "express";
import cors from "cors";
import swaggerUiExpress from "swagger-ui-express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import swaggerSpec from "./config/swagger";
import v1Routes from "./routes/v1";
import errorMiddleware from "./middlewares/error.middleware";
import prisma from "./lib/prisma";

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: "Too many requests, please try again later",
});

app.use("/api/v1/auth", authLimiter);

// API Routes
app.use("/api/v1", v1Routes);

// Swagger Documentation
app.use("/api/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerSpec));

// Global Error Handling
app.use(errorMiddleware);

// Server Start
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect to Prisma
    await prisma.$connect();
    console.log("✓ Database connected");

    // Listen on port
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

// Graceful shutdown
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
