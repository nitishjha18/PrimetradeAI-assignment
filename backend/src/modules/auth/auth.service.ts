import { z } from "zod";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient, Role } from "@prisma/client";

// Validation schemas
const emailSchema = z.string().email("Invalid email format");
const passwordSchema = z.string().min(8, "Password must be at least 8 characters");

const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  role: z.enum(["USER", "ADMIN"]).optional(),
});

const loginSchema = z.object({
  email: emailSchema,
  password: z.string(),
});

interface AuthError extends Error {
  statusCode: number;
}

const createAuthError = (message: string, statusCode: number): AuthError => {
  const error = new Error(message) as AuthError;
  error.statusCode = statusCode;
  return error;
};

export class AuthService {
  private prisma: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient;
  }

  async registerUser(
    email: string,
    password: string,
    role: Role = "USER"
  ): Promise<{ token: string; user: Omit<any, "password"> }> {
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
    const hashedPassword = await bcryptjs.hash(validated.password, 10);

    // Create user
    const user = await this.prisma.user.create({
      data: {
        email: validated.email,
        password: hashedPassword,
        role: validated.role || "USER",
      },
    });

    // Sign JWT
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    // Return token and user (without password)
    const { password: _, ...userWithoutPassword } = user;
    return { token, user: userWithoutPassword };
  }

  async loginUser(
    email: string,
    password: string
  ): Promise<{ token: string; user: Omit<any, "password"> }> {
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
    const isPasswordValid = await bcryptjs.compare(
      validated.password,
      user.password
    );

    if (!isPasswordValid) {
      throw createAuthError("Invalid email or password", 401);
    }

    // Sign JWT
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    // Return token and user (without password)
    const { password: _, ...userWithoutPassword } = user;
    return { token, user: userWithoutPassword };
  }
}
