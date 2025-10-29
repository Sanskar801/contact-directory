import { useState } from 'react';
import { UserPlus } from 'lucide-react';
import ContactCard from './ContactCard';
import ContactForm from './ContactForm';
import SearchBar from './SearchBar';
import SortMenu from './SortMenu';
import EmptyState from './EmptyState';
import Pagination from './Pagination';
import type { Contact, SortOption } from '../../types';
import { useSearch } from '../../hooks/useSearch';
import { useContacts, useSearchContacts } from '../../hooks/useContacts';
import { DEFAULT_PAGE_SIZE } from '../../utils/constants';
import { useCreateContact, useDeleteContact, useUpdateContact } from '../../hooks/useContactMutations';
import type { ContactFormInput } from '../../utils/validations';
import Spinner from '../ui/Spinner';
import Button from '../ui/Button';
import Modal from '../ui/Modal';

export default function ContactList() {
    // State
    const [page, setPage] = useState(0);
    const [sort, setSort] = useState<SortOption>({
        field: 'name',
        direction: 'asc',
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingContact, setEditingContact] = useState<Contact | null>(null);

    // Search
    const { searchTerm, debouncedSearchTerm, setSearchTerm, clearSearch, isSearching } =
        useSearch();

    // Queries
    const isSearchMode = debouncedSearchTerm.length >= 2;
    const contactsQuery = useContacts({
        page,
        size: DEFAULT_PAGE_SIZE,
        sort,
    });
    const searchQuery = useSearchContacts({
        query: debouncedSearchTerm,
        page,
        size: DEFAULT_PAGE_SIZE,
        sort,
    });

    const activeQuery = isSearchMode ? searchQuery : contactsQuery;
    const { data, isLoading, isError, error } = activeQuery;

    // Mutations
    const createMutation = useCreateContact();
    const updateMutation = useUpdateContact();
    const deleteMutation = useDeleteContact();

    // Handlers
    const handleAddContact = () => {
        setEditingContact(null);
        setIsModalOpen(true);
    };

    const handleEditContact = (contact: Contact) => {
        setEditingContact(contact);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingContact(null);
    };

    const handleSubmit = async (formData: ContactFormInput) => {
        try {
            if (editingContact) {
                await updateMutation.mutateAsync({
                    id: editingContact.id,
                    data: formData,
                });
            } else {
                await createMutation.mutateAsync(formData);
            }
            handleCloseModal();
        } catch (err) {
            // Error is handled by TanStack Query
            console.error('Failed to save contact:', err);
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this contact?')) {
            try {
                await deleteMutation.mutateAsync(id);
            } catch (err) {
                console.error('Failed to delete contact:', err);
            }
        }
    };

    const handleSortChange = (newSort: SortOption) => {
        setSort(newSort);
        setPage(0); // Reset to first page when sorting changes
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleClearSearch = () => {
        clearSearch();
        setPage(0);
    };

    // Render states
    if (isLoading && !data) {
        return (
            <div className="flex h-96 items-center justify-center">
                <Spinner size="lg" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <p className="mb-4 text-lg text-red-600">
                    {error?.message || 'Failed to load contacts'}
                </p>
                <Button onClick={() => activeQuery.refetch()}>Try Again</Button>
            </div>
        );
    }

    const contacts = data?.content || [];
    const isEmpty = contacts.length === 0;

    return (
        <div className="mx-auto max-w-4xl space-y-4 p-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Contacts</h1>
                <Button onClick={handleAddContact}>
                    <UserPlus className="h-5 w-5" />
                    Add Contact
                </Button>
            </div>

            {/* Search and Sort */}
            <div className="flex gap-3">
                <div className="flex-1">
                    <SearchBar
                        value={searchTerm}
                        onChange={setSearchTerm}
                        onClear={handleClearSearch}
                        isSearching={isSearching}
                    />
                </div>
                <SortMenu currentSort={sort} onSortChange={handleSortChange} />
            </div>

            {/* Contact List */}
            {isEmpty ? (
                <EmptyState
                    type={isSearchMode ? 'no-results' : 'no-contacts'}
                    searchQuery={debouncedSearchTerm}
                    onAddContact={handleAddContact}
                    onClearSearch={handleClearSearch}
                />
            ) : (
                <>
                    <div className="space-y-3">
                        {contacts.map((contact) => (
                            <ContactCard
                                key={contact.id}
                                contact={contact}
                                onEdit={handleEditContact}
                                onDelete={handleDelete}
                                isDeleting={deleteMutation.isPending}
                            />
                        ))}
                    </div>

                    {/* Pagination */}
                    {data && (
                        <Pagination
                            currentPage={data.pageNumber}
                            totalPages={data.totalPages}
                            totalElements={data.totalElements}
                            pageSize={data.pageSize}
                            onPageChange={handlePageChange}
                            isLoading={isLoading}
                        />
                    )}
                </>
            )}

            {/* Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={editingContact ? 'Edit Contact' : 'Add New Contact'}
            >
                <ContactForm
                    contact={editingContact || undefined}
                    onSubmit={handleSubmit}
                    onCancel={handleCloseModal}
                    isSubmitting={createMutation.isPending || updateMutation.isPending}
                />
            </Modal>
        </div>
    );
}