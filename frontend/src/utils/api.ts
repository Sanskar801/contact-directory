import axios, { AxiosError } from "axios";
import { API_BASE_URL, API_TIMEOUT } from "./constants";
import type { ErrorResponse } from "../types";

export const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ErrorResponse>) => {
        if (!error.response) {
            return Promise.reject({
                status: 0,
                message: "Network error. ",
                timestamp: new Date().toISOString(),
            } as ErrorResponse);
        }

        const errorResponse: ErrorResponse = {
            status: error.response.status,
            message: error.response.data?.message || error.message,
            timestamp: error.response.data?.timestamp || new Date().toISOString(),
            errors: error.response.data?.errors,
        };

        switch (error.response.status) {
            case 400:
                break;
            case 404:
                errorResponse.message = errorResponse.message || 'Resource not found';
                break;
            case 409:
                errorResponse.message = errorResponse.message || 'Duplicate resource';
                break;
            case 500:
                errorResponse.message = 'Server error. Please try again later.';
                break;
            default:
                errorResponse.message = errorResponse.message || 'An unexpected error occurred';
        }

        return Promise.reject(errorResponse);
    }
);

export function isErrorResponse(error: unknown): error is ErrorResponse {
    return (
        typeof error === 'object' &&
        error !== null &&
        'status' in error &&
        'message' in error
    );
}

export function getErrorMessage(error: unknown): string {
    if (isErrorResponse(error)) {
        if (error.errors && Object.keys(error.errors).length > 0) {
            return Object.values(error.errors)[0] || error.message;
        }
        return error.message;
    }

    if (error instanceof Error) {
        return error.message;
    }

    return 'An unexpected error occurred';
}