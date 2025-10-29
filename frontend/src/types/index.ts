export interface Contact {
    id: number;
    name: string;
    phone: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}

export interface ContactFormData {
    name: string;
    phone: string;
    email: string;
}

export interface PagedResponse<T> {
    content: T[];
    pageNumber: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
    empty: boolean;
}

export type SortField = 'name' | 'email' | 'phone' | 'createdAt' | 'updatedAt';
export type SortDirection = 'asc' | 'desc';

export interface SortOption {
    field: SortField;
    direction: SortDirection;
}

export interface PaginationParams {
    page: number;
    size: number;
    sort: SortOption;
}

export interface SearchParams extends PaginationParams {
    query: string;
}

export interface ErrorResponse {
    status: number;
    message: string;
    timestamp: string;
    errors?: Record<string, string>;
}