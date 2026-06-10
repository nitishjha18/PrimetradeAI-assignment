import { PrismaClient, Role } from "@prisma/client";
export declare class AuthService {
    private prisma;
    constructor(prismaClient: PrismaClient);
    registerUser(email: string, password: string, role?: Role): Promise<{
        token: string;
        user: Omit<any, "password">;
    }>;
    loginUser(email: string, password: string): Promise<{
        token: string;
        user: Omit<any, "password">;
    }>;
}
//# sourceMappingURL=auth.service.d.ts.map