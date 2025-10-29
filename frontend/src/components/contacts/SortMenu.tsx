/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import { ArrowUpDown, Check } from "lucide-react";
import { SORT_OPTIONS } from "../../utils/constants";
import { useEffect, useRef, useState } from "react";
import type { SortOption } from "../../types";

interface SortMenuProps {
    currentSort: SortOption;
    onSortChange: (sort: SortOption) => void;
}

export default function SortMenu({ currentSort, onSortChange }: SortMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const currentLabel =
        SORT_OPTIONS.find(
            (opt) =>
                opt.field === currentSort.field &&
                opt.direction === currentSort.direction
        )?.label || 'Name (A-Z)';

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div ref={menuRef} className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
                <ArrowUpDown className="h-4 w-4" />
                <span>{currentLabel}</span>
            </button>

            {isOpen && (
                <div className="absolute right-0 z-10 mt-2 w-56 rounded-lg border border-gray-200 bg-white shadow-lg">
                    <div className="p-1">
                        {SORT_OPTIONS.map((option) => {
                            const isSelected =
                                option.field === currentSort.field &&
                                option.direction === currentSort.direction;

                            return (
                                <button
                                    key={option.value}
                                    onClick={() => {
                                        onSortChange({
                                            field: option.field as any,
                                            direction: option.direction as any,
                                        });
                                        setIsOpen(false);
                                    }}
                                    className={clsx(
                                        'flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm transition-colors',
                                        isSelected
                                            ? 'bg-(--color-primary) text-white'
                                            : 'text-gray-700 hover:bg-gray-100'
                                    )}
                                >
                                    <span>{option.label}</span>
                                    {isSelected && <Check className="h-4 w-4" />}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}