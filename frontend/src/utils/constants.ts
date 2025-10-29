
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
export const API_TIMEOUT = 30000; 


export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;
export const INITIAL_PAGE = 0;


export const QUERY_KEYS = {
  contacts: ['contacts'],
  contact: (id: number) => ['contact', id],
  searchContacts: (query: string) => ['contacts', 'search', query],
} as const;


export const SEARCH_DEBOUNCE_MS = 300;
export const AUTO_SAVE_DEBOUNCE_MS = 1000;


export const SORT_OPTIONS = [
  { value: 'name-asc', label: 'Name (A-Z)', field: 'name', direction: 'asc' },
  { value: 'name-desc', label: 'Name (Z-A)', field: 'name', direction: 'desc' },
  { value: 'email-asc', label: 'Email (A-Z)', field: 'email', direction: 'asc' },
  { value: 'email-desc', label: 'Email (Z-A)', field: 'email', direction: 'desc' },
  { value: 'createdAt-desc', label: 'Newest First', field: 'createdAt', direction: 'desc' },
  { value: 'createdAt-asc', label: 'Oldest First', field: 'createdAt', direction: 'asc' },
  { value: 'updatedAt-desc', label: 'Recently Updated', field: 'updatedAt', direction: 'desc' },
] as const;


export const STORAGE_KEYS = {
  sortPreference: 'contact-sort-preference',
  pageSizePreference: 'contact-page-size',
  viewMode: 'contact-view-mode',
} as const;


export const TOAST_DURATION = {
  success: 3000,
  error: 5000,
  info: 4000,
} as const;


export const ANIMATION = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;