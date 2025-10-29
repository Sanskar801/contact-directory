import { useCallback, useEffect, useState } from "react";
import { SEARCH_DEBOUNCE_MS } from "../utils/constants";

export function useSearch(initialValue = "") {
    const [searchTerm, setSearchTerm] = useState(initialValue);
    const [debounceSearchTerm, setDebounceSearchTerm] = useState(initialValue);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounceSearchTerm(searchTerm);
        }, SEARCH_DEBOUNCE_MS);

        return () => { clearTimeout(timer); };
    }, [searchTerm]);

    const clearSearch = useCallback(() => {
        setSearchTerm("");
        setDebounceSearchTerm("");
    }, []);

    return {
        searchTerm,
        debounceSearchTerm,
        setSearchTerm,
        clearSearch,
        isSearching: searchTerm != debounceSearchTerm,
    };
}