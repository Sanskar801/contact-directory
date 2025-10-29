import { memo } from "react";
import type { Contact } from "../../types";
import { Edit, Mail, Phone, Trash2 } from "lucide-react";
import clsx from "clsx";

interface ContactCardProps {
    contact: Contact;
    onEdit: (contact: Contact) => void;
    onDelete: (id: number) => void;
    isDeleting?: boolean;
}


function ContactCard({
    contact,
    onEdit,
    onDelete,
    isDeleting = false,
}: ContactCardProps) {
    const initials = contact.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    return (
        <div
            className={clsx(
                'group relative rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md',
                isDeleting && 'opacity-50'
            )}
        >
            <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-purple-600 text-white font-semibold">
                    {initials}
                </div>

                {/* Contact Info */}
                <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {contact.name}
                    </h3>

                    <div className="mt-2 space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Phone className="h-4 w-4 shrink-0 text-gray-400" />
                            <span className="truncate">{contact.phone}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Mail className="h-4 w-4 shrink-0 text-gray-400" />
                            <span className="truncate">{contact.email}</span>
                        </div>
                    </div>

                    {/* Timestamp */}
                    <p className="mt-2 text-xs text-gray-400">
                        Updated {new Date(contact.updatedAt).toLocaleDateString()}
                    </p>
                </div>

                {/* Actions */}
                <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                        onClick={() => onEdit(contact)}
                        disabled={isDeleting}
                        className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-(--color-primary) disabled:cursor-not-allowed"
                        aria-label="Edit contact"
                    >
                        <Edit className="h-5 w-5" />
                    </button>
                    <button
                        onClick={() => onDelete(contact.id)}
                        disabled={isDeleting}
                        className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-(--color-danger) disabled:cursor-not-allowed"
                        aria-label="Delete contact"
                    >
                        <Trash2 className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default memo(ContactCard);