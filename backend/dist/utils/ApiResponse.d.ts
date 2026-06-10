export declare class ApiResponse<T = null> {
    readonly statusCode: number;
    readonly message: string;
    readonly data: T | null;
    readonly success: boolean;
    constructor(statusCode: number, message: string, data?: T, success?: boolean);
    static success<T>(message: string, data?: T): ApiResponse<T>;
    static error(message: string, statusCode?: number): ApiResponse<null>;
}
//# sourceMappingURL=ApiResponse.d.ts.map