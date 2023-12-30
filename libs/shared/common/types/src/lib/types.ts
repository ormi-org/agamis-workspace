export interface ApiErrorResponse {
  code: number;
  message: string;
  cause: string;
}

export const isApiErrorResponse = (error: ApiErrorResponse): error is ApiErrorResponse => {
  return 'code' in error && 'message' in error;
}