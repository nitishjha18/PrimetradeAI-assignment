"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const zod_1 = require("zod");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
// Validation schemas
const emailSchema = zod_1.z.string().email("Invalid email format");
const passwordSchema = zod_1.z.string().min(8, "Password must be at least 8 characters");
const registerSchema = zod_1.z.object({
    email: emailSchema,
    password: passwordSchema,
    role: zod_1.z.enum(["USER", "ADMIN"]).optional(),
});
const loginSchema = zod_1.z.object({
    email: emailSchema,
    password: zod_1.z.string(),
});
const createAuthError = (message, statusCode) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
};
class AuthService {
    constructor(prismaClient) {
        this.prisma = prismaClient;
    }
    async registerUser(email, password, role = "USER") {
        // Validate input
        const validated = registerSchema.parse({ email, password, role });
        // Check if user already exists
        const existingUser = await this.prisma.user.findUnique({
            where: { email: validated.email },
        });
        if (existingUser) {
            throw createAuthError("Email already registered", 409);
        }
        // Hash password
        const hashedPassword = await bcryptjs_1.default.hash(validated.password, 10);
        // Create user
        const user = await this.prisma.user.create({
            data: {
                email: validated.email,
                password: hashedPassword,
                role: validated.role || "USER",
            },
        });
        // Sign JWT
        const token = jsonwebtoken_1.default.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });
        // Return token and user (without password)
        const { password: _, ...userWithoutPassword } = user;
        return { token, user: userWithoutPassword };
    }
    async loginUser(email, password) {
        // Validate input
        const validated = loginSchema.parse({ email, password });
        // Find user by email
        const user = await this.prisma.user.findUnique({
            where: { email: validated.email },
        });
        if (!user) {
            throw createAuthError("Invalid email or password", 401);
        }
        // Compare password
        const isPasswordValid = await bcryptjs_1.default.compare(validated.password, user.password);
        if (!isPasswordValid) {
            throw createAuthError("Invalid email or password", 401);
        }
        // Sign JWT
        const token = jsonwebtoken_1.default.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });
        // Return token and user (without password)
        const { password: _, ...userWithoutPassword } = user;
        return { token, user: userWithoutPassword };
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map