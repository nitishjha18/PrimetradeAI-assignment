"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
class ApiResponse {
    constructor(statusCode, message, data, success) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data ?? null;
        this.success = success ?? statusCode < 400;
    }
    static success(message, data) {
        return new ApiResponse(200, message, data, true);
    }
    static error(message, statusCode = 400) {
        return new ApiResponse(statusCode, message, null, false);
    }
}
exports.ApiResponse = ApiResponse;
//# sourceMappingURL=ApiResponse.js.map