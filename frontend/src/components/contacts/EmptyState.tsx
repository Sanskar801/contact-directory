import { Search, UserPlus } from "lucide-react";
import Button from "../ui/Button";

interface EmptyStateProps {
    type: 'no-contacts' | 'no-results';
    searchQuery?: string;
    onAddContact?: () => void;
    onClearSearch?: () => void;
}
export default function EmptyState({
    type,
    searchQuery,
    onAddContact,
    onClearSearch,
}: EmptyStateProps) {
    if (type === 'no-results') {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="rounded-full bg-gray-100 p-4 mb-4">
                    <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No contacts found
                </h3>
                <p className="text-gray-600 mb-4 max-w-md">
                    We couldn't find any contacts matching "{searchQuery}". Try adjusting
                    your search.
                </p>
                {onClearSearch && (
                    <Button variant="secondary" onClick={onClearSearch}>
                        Clear Search
                    </Button>
                )}
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="rounded-full bg-linear-to-br from-blue-500 to-purple-600 p-4 mb-4">
                <UserPlus className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No contacts yet
            </h3>
            <p className="text-gray-600 mb-4 max-w-md">
                Get started by adding your first contact. You can store names, phone
                numbers, and email addresses.
            </p>
            {onAddContact && (
                <Button onClick={onAddContact}>
                    <UserPlus className="h-5 w-5" />
                    Add Your First Contact
                </Button>
            )}
        </div>
    );
}