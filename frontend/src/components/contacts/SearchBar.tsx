import clsx from "clsx";
import { Search, X } from "lucide-react";

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    onClear: () => void;
    placeholder?: string;
    isSearching?: boolean;
}

export default function SearchBar({
    value,
    onChange,
    onClear,
    placeholder = 'Search contacts...',
    isSearching = false,
}: SearchBarProps) {
    return (
        <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search
                    className={clsx(
                        'h-5 w-5',
                        isSearching ? 'animate-pulse text-(--color-primary)' : 'text-gray-400'
                    )}
                />
            </div>

            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className={clsx(
                    'w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-10 text-base',
                    'placeholder:text-gray-400',
                    'focus:border-(--color-primary) focus:outline-none focus:ring-2 focus:ring-(--color-primary) focus:ring-offset-1',
                    'transition-colors'
                )}
            />

            {value && (
                <button
                    onClick={onClear}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                    aria-label="Clear search"
                >
                    <X className="h-5 w-5" />
                </button>
            )}
        </div>
    );
}
