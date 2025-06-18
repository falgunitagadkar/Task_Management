export interface BaseResponseModel<T> {
    isSuccess: boolean;
    data: T;
    statusCode: number;
    message: string;
    errorMessages: string[];
}