import { useQuery } from "@tanstack/react-query";
import type { PaginationParams, SearchParams } from "../types";
import { queryKeys } from "../utils/queryClient";
import { getAllContacts, getContactById, searchContacts } from "../services/ContactServicesFrontend";


export function useContacts(params: PaginationParams) {
    const sortParam = `${params.sort.field},${params.sort.direction}`;

    return useQuery({
        queryKey: queryKeys.contacts.list({
            page: params.page,
            size: params.size,
            sort: sortParam,
        }),
        queryFn: () => getAllContacts(params),
        staleTime: 5 * 60 * 1000,
        placeholderData: (previousData) => previousData,
    });
}

export function useSearchContacts(params: SearchParams) {
    const sortParam = `${params.sort.field},${params.sort.direction}`;

    return useQuery({
        queryKey: queryKeys.search.query(params.query, {
            page: params.page,
            size: params.size,
            sort: sortParam,
        }),
        queryFn: () => searchContacts(params),
        enabled: params.query.length >= 2,
        staleTime: 3 * 60 * 1000,
    });
}

export function useContact(id: number) {
    return useQuery({
        queryKey: queryKeys.contact.detail(id),
        queryFn: () => getContactById(id),
        staleTime: 10 * 60 * 1000,
    });
}