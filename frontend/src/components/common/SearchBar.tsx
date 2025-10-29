import { Search, X } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
    value: string;
    placeholder?: string;
    onChange: (value: string) => void;
}

export default function SearchBar({
    value,
    onChange,
    placeholder = 'Search contacts...', }: SearchBarProps) {
    const [isFocused, setIsFocused] = useState(false);
    return (
        <div className="relative">
            <div
                className={`flex items-center gap-2 bg-ios-gray rounded-lg px-4 py-3 transition-all ${isFocused ? 'ring-2 ring-ios-blue' : ''
                    }`}
            >
                <Search className="w-5 h-5 text-ios-tertiaryLabel shrink-0" />
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={placeholder}
                    className="flex-1 bg-transparent border-none outline-none text-ios-label placeholder:text-ios-tertiaryLabel"
                />
                {value && (
                    <button
                        onClick={() => onChange('')}
                        className="p-1 hover:bg-gray-300 rounded-full transition-colors"
                    >
                        <X className="w-4 h-4 text-ios-secondaryLabel" />
                    </button>
                )}
            </div>
        </div>
    )
}
