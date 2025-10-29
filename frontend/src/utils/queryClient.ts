import { QueryClient } from "@tanstack/react-query";
import { getErrorMessage } from "./api";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000,
            gcTime: 10 * 60 * 1000,
            retry: (failureCount, error) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const status = (error as any)?.status;
                if (status && status >= 400 && status < 500) {
                   return false; 
                }
                return failureCount < 3;
            },

            retryDelay: (attenptIndex) => Math.min(1000 * 2 ** attenptIndex, 30000),

            refetchOnWindowFocus: true,
            refetchOnReconnect: true,
            refetchOnMount: false,
            throwOnError: false,
        },
        mutations: {
            retry: 1,
            onError: (error) => {
                console.error("Mutation error:", getErrorMessage(error));
            },
        },
    },
});


export const queryKeys = {
    contacts: {
        all: ['contacts'] as const,
        lists: () => [...queryKeys.contacts.all, 'list'] as const,
        list: (params: {
            page: number;
            size: number;
            sort: string;
        }) => [...queryKeys.contacts.lists(), params] as const,
    },

    search: {
        all: ['contacts', 'search'] as const,
        query: (searchTerm: string, params: {
            page: number;
            size: number;
            sort: string;
        }) => [...queryKeys.search.all, searchTerm, params] as const,
    },

    contact: {
        all: ['contact'] as const,
        detail: (id: number) => [...queryKeys.contact.all, id] as const,
        byEmail: (email: string) => [...queryKeys.contact.all, 'email', email] as const
    },
} as const;


export function invalidateContactQueries() {
    return queryClient.invalidateQueries({
        queryKey: queryKeys.contacts.all,
    });
}

export function prefetchContactsPage(params: {
  page: number;
  size: number;
  sort: string;
}) {
  return queryClient.prefetchQuery({
    queryKey: queryKeys.contacts.list(params),
    staleTime: 5 * 60 * 1000,
  });
}