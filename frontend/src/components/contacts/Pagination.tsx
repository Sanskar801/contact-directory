import { ChevronLeft, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';
import Button from '../ui/Button';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    totalElements: number;
    pageSize: number;
    onPageChange: (page: number) => void;
    isLoading?: boolean;
}

export default function Pagination({
    currentPage,
    totalPages,
    totalElements,
    pageSize,
    onPageChange,
    isLoading = false,
}: PaginationProps) {
    const startItem = currentPage * pageSize + 1;
    const endItem = Math.min((currentPage + 1) * pageSize, totalElements);

    const canGoPrevious = currentPage > 0;
    const canGoNext = currentPage < totalPages - 1;

    // Generate page numbers to show
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            // Show all pages
            for (let i = 0; i < totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Show with ellipsis
            if (currentPage < 3) {
                pages.push(0, 1, 2, 3, '...', totalPages - 1);
            } else if (currentPage > totalPages - 4) {
                pages.push(
                    0,
                    '...',
                    totalPages - 4,
                    totalPages - 3,
                    totalPages - 2,
                    totalPages - 1
                );
            } else {
                pages.push(
                    0,
                    '...',
                    currentPage - 1,
                    currentPage,
                    currentPage + 1,
                    '...',
                    totalPages - 1
                );
            }
        }

        return pages;
    };

    if (totalPages <= 1) {
        return (
            <div className="flex justify-center py-4 text-sm text-gray-600">
                Showing {totalElements} {totalElements === 1 ? 'contact' : 'contacts'}
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center gap-4 py-4 sm:flex-row sm:justify-between">
            {/* Info */}
            <p className="text-sm text-gray-600">
                Showing {startItem} to {endItem} of {totalElements} contacts
            </p>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={!canGoPrevious || isLoading}
                    aria-label="Previous page"
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>

                {getPageNumbers().map((page, index) => {
                    if (page === '...') {
                        return (
                            <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
                                ...
                            </span>
                        );
                    }

                    const pageNum = page as number;
                    const isActive = pageNum === currentPage;

                    return (
                        <button
                            key={pageNum}
                            onClick={() => onPageChange(pageNum)}
                            disabled={isLoading}
                            className={clsx(
                                'h-8 w-8 rounded-lg text-sm font-medium transition-colors',
                                isActive
                                    ? 'bg-(--color-primary) text-white'
                                    : 'text-gray-700 hover:bg-gray-100',
                                isLoading && 'cursor-not-allowed opacity-50'
                            )}
                        >
                            {pageNum + 1}
                        </button>
                    );
                })}

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={!canGoNext || isLoading}
                    aria-label="Next page"
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}