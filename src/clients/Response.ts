export type Response<T = {}> = (Success & T) | Failure;

export interface Failure {
    success: false;
    error: string;
}

export interface Success {
    success: true;
}
