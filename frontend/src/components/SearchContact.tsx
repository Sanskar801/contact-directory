import { useState, type ChangeEvent } from "react";


export default function SearchContact() {
    const [searchQuery, setSearchQuery] = useState("");
    const handleSearchOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    }
    return (
            <input
                className="w-full h-12 md:max-w-2/3 bg-white px-2 mb-4 rounded-xl pl-4"
                type="search"
                name="contact-search"
                id="contact-search"
                placeholder="Search by name, contact or email"
                value={searchQuery}
                onChange={handleSearchOnChange}
            />
    )
}
