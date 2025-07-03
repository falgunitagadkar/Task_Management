export interface BaseResponseModel<T> {
    isSuccess: boolean;
    data: T;
    statusCode: number;
    message: string;
    errorMessages: string[];
}

export interface DataQueryResponseModel<T>
{
    records : T[];
    totalRecords : number;
}