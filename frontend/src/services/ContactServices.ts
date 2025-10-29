import type { Contact, ContactFormData, PagedResponse, PaginationParams, SearchParams } from "../types";
import { api } from "../utils/api";

const CONTACTS_ENDPOINT = '/contacts';

export async function getAllContacts(params: PaginationParams): Promise<PagedResponse<Contact>> {
    const { page, size, sort } = params;
    const sortParam = `${sort.field},${sort.direction}`;

    const response = await api.get<PagedResponse<Contact>>(CONTACTS_ENDPOINT, {
        params: {
            page,
            size,
            sort: sortParam,
        },
    });
    return response.data;
}

export async function searchContacts(params: SearchParams): Promise<PagedResponse<Contact>> {
    const { query, page, size, sort } = params;
    const sortParam = `${sort.field},${sort.direction}`;

    const response = await api.get<PagedResponse<Contact>>(
        `${CONTACTS_ENDPOINT}/search`,
        {
            params: {
                name: query,
                page,
                size,
                sort: sortParam,
            },
        }
    );

    return response.data;
}

export async function getContactById(id: number): Promise<Contact> {
    const response = await api.get<Contact>(`${CONTACTS_ENDPOINT}/${id}`);
    return response.data;
}

export async function getContactByEmail(email: string): Promise<Contact> {
    const response = await api.get<Contact>(
        `${CONTACTS_ENDPOINT}/email/${encodeURIComponent(email)}`
    );
    return response.data;
}

export async function createContact(data: ContactFormData): Promise<Contact> {
    const response = await api.post<Contact>(CONTACTS_ENDPOINT, data);
    return response.data;
}

export async function updateContact(
    id: number,
    data: ContactFormData
): Promise<Contact> {
    const response = await api.put<Contact>(`${CONTACTS_ENDPOINT}/${id}`, data);
    return response.data;
}

export async function deleteContact(id: number): Promise<void> {
    await api.delete(`${CONTACTS_ENDPOINT}/${id}`);
}