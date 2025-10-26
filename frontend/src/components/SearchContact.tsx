import { useState, type ChangeEvent } from "react";


export default function SearchContact() {
    const [searchQuery, setSearchQuery] = useState("");
    const handleSearchOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    }
    return (
        <div className="flex">
            <input
                className="w-full bg-amber-50"
                type="search"
                name="contact-search"
                id="contact-search"
                placeholder="Search by name, contact or email"
                value={searchQuery}
                onChange={handleSearchOnChange}
            />
        </div>
    )
}
