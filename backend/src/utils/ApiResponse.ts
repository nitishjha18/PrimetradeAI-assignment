export class ApiResponse<T = null> {
  readonly statusCode: number;
  readonly message: string;
  readonly data: T | null;
  readonly success: boolean;

  constructor(
    statusCode: number,
    message: string,
    data?: T,
    success?: boolean
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data ?? null;
    this.success = success ?? statusCode < 400;
  }

  static success<T>(message: string, data?: T): ApiResponse<T> {
    return new ApiResponse(200, message, data, true);
  }

  static error(message: string, statusCode: number = 400): ApiResponse<null> {
    return new ApiResponse(statusCode, message, null, false);
  }
}
