import { useCallback, useEffect, useState } from "react";
import { SEARCH_DEBOUNCE_MS } from "../utils/constants";

export function useSearch(initialValue = "") {
    const [searchTerm, setSearchTerm] = useState(initialValue);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(initialValue);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, SEARCH_DEBOUNCE_MS);

        return () => { clearTimeout(timer); };
    }, [searchTerm]);

    const clearSearch = useCallback(() => {
        setSearchTerm("");
        setDebouncedSearchTerm("");
    }, []);

    return {
        searchTerm,
        debouncedSearchTerm,
        setSearchTerm,
        clearSearch,
        isSearching: searchTerm != debouncedSearchTerm,
    };
}