// import { useState } from "react";
// import { type SortOption } from "../../types";
// import { useSearch } from "../../hooks/useSearch";
// import { useContacts, useSearchContacts } from "../../hooks/useContacts";
// import { DEFAULT_PAGE_SIZE } from "../../utils/constants";
// import { useCreateContact, useDeleteContact, useUpdateContact } from "../../hooks/useContactMutations";



// export default function ContactList() {

//     const [page, setPage] = useState(0);
//     const [sort, setSort] = useState<SortOption>({
//         field: 'name',
//         direction: 'asc',
//     });
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [editingContact, setEditingContact] = useState<Contact | null>(null);

//     const { searchTerm, debouncedSearchTerm, setSearchTerm, clearSearch, isSearching } = useSearch();

//     const isSearchMode = debouncedSearchTerm.length >= 2;
//     const contactsQuery = useContacts({
//         page,
//         size: DEFAULT_PAGE_SIZE,
//         sort,
//     });
//     const searchQuery = useSearchContacts({
//         query: debouncedSearchTerm,
//         page,
//         size: DEFAULT_PAGE_SIZE,
//         sort,
//     });

//     const activeQuery = isSearchMode ? searchQuery : contactsQuery;
//     const { data, isLoading, isError, error } = activeQuery;

//     const createMutation = useCreateContact();
//     const updateMutation = useUpdateContact();
//     const deleteMutation = useDeleteContact();


//     return (
//         <div className="w-full flex flex-col gap-0.5">
//         </div>
//     )
// }
