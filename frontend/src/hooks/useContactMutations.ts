import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type Contact, type ContactFormData } from "../types";
import { createContact, deleteContact, updateContact } from "../services/ContactServicesFrontend";
import { queryKeys } from "../utils/queryClient";

export function useCreateContact() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: ContactFormData) => createContact(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.contacts.all });
        },
    });
}


export function useUpdateContact() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: ContactFormData }) => updateContact(id, data),
        onMutate: async ({ id, data }) => {
            await queryClient.cancelQueries({ queryKey: queryKeys.contact.detail(id) });

            const previousContact = queryClient.getQueryData<Contact>(
                queryKeys.contact.detail(id)
            );

            if (previousContact) {
                queryClient.setQueryData<Contact>(queryKeys.contact.detail(id), {
                    ...previousContact,
                    ...data,
                    updatedAt: new Date().toISOString(),
                });
            }

            return { previousContact };
        },

        onError: (_err, { id }, context) => {
            if (context?.previousContact) {
                queryClient.setQueryData(
                    queryKeys.contact.detail(id),
                    context.previousContact
                );
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.contacts.all });
        },
    });
}

export function useDeleteContact() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deleteContact(id),
        onSuccess: () => {
            // Refetch lists and any details to reflect deletion
            queryClient.invalidateQueries({ queryKey: queryKeys.contacts.all });
        },
    });
}