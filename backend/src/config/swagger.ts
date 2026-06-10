import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Primetrade Task API",
      version: "1.0.0",
      description: "Task management API with JWT auth and RBAC",
    },
    servers: [
      {
        url: "/api/v1",
        description: "API v1",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "JWT Authorization header using the Bearer scheme",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "User ID (CUID)",
            },
            email: {
              type: "string",
              format: "email",
              description: "User email address",
            },
            role: {
              type: "string",
              enum: ["USER", "ADMIN"],
              description: "User role",
            },
          },
          required: ["id", "email", "role"],
        },
        Task: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "Task ID (CUID)",
            },
            title: {
              type: "string",
              description: "Task title",
            },
            description: {
              type: "string",
              description: "Task description",
            },
            status: {
              type: "string",
              enum: ["PENDING", "IN_PROGRESS", "COMPLETED"],
              description: "Task status",
            },
            userId: {
              type: "string",
              description: "User ID of task owner",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Task creation timestamp",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Task last updated timestamp",
            },
          },
          required: ["id", "title", "status", "userId", "createdAt", "updatedAt"],
        },
        AuthResponse: {
          type: "object",
          properties: {
            token: {
              type: "string",
              description: "JWT authentication token",
            },
            user: {
              $ref: "#/components/schemas/User",
            },
          },
          required: ["token", "user"],
        },
        ApiResponse: {
          type: "object",
          properties: {
            statusCode: {
              type: "integer",
              description: "HTTP status code",
            },
            message: {
              type: "string",
              description: "Response message",
            },
            data: {
              type: "object",
              description: "Response data",
            },
            success: {
              type: "boolean",
              description: "Whether the request was successful",
            },
          },
        },
      },
    },
  },
  apis: ["./src/modules/**/*.routes.ts"],
};

export default swaggerJsdoc(options);
