export class ApiResponse<T> {
    data: T;
    statusCode: 400 | 200 | 401 | 403;
    message?: string;
}