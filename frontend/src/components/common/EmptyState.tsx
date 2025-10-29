import { SearchIcon, UserX } from "lucide-react";

interface EmptyStateProps {
    type?: 'no-contacts' | 'no-results';
    searchQuery?: string;
}

export default function EmptyState({ type = 'no-contacts', searchQuery, }: EmptyStateProps) {

    const config = {
        'no-contacts': {
            icon: UserX,
            title: 'No Contacts Yet',
            description: 'Tap the + button to add your first contact',
        },
        'no-results': {
            icon: SearchIcon,
            title: 'No Results Found',
            description: searchQuery
                ? `No contacts found for "${searchQuery}"`
                : 'Try adjusting your search',
        },
    };

    const { icon: Icon, title, description } = config[type];

    return (
        <div className="flex flex-col items-center justify-center gap-4 py-16 px-4">
            <div className="w-20 h-20 rounded-full bg-ios-gray flex items-center justify-center">
                <Icon className="w-10 h-10 text-ios-tertiaryLabel" />
            </div>
            <div className="text-center max-w-sm">
                <h3 className="text-xl font-semibold text-ios-label mb-2">{title}</h3>
                <p className="text-sm text-ios-secondaryLabel">{description}</p>
            </div>
        </div>
    )
}
