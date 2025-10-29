import { useForm } from "react-hook-form";
import type { Contact } from "../../types";
import { contactSchema, type ContactFormInput } from "../../utils/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../ui/Button";
import Input from "../ui/Input";

interface ContactFormProps {
    contact?: Contact;
    onSubmit: (data: ContactFormInput) => void;
    onCancel: () => void;
    isSubmitting?: boolean;
}

export default function ContactForm({ contact,
    onSubmit,
    onCancel,
    isSubmitting = false,
}: ContactFormProps) {

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty },
    } = useForm<ContactFormInput>({
        resolver: zodResolver(contactSchema),
        defaultValues: contact
            ? {
                name: contact.name,
                phone: contact.phone,
                email: contact.email,
            }
            : undefined,
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
                label="Name"
                placeholder="John Doe"
                error={errors.name?.message}
                {...register('name')}
                autoFocus
            />

            <Input
                label="Phone"
                type="tel"
                placeholder="+1-555-1234"
                error={errors.phone?.message}
                {...register('phone')}
            />

            <Input
                label="Email"
                type="email"
                placeholder="john.doe@example.com"
                error={errors.email?.message}
                {...register('email')}
            />

            <div className="flex gap-3 pt-4">
                <Button
                    type="button"
                    variant="secondary"
                    onClick={onCancel}
                    disabled={isSubmitting}
                    fullWidth
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    isLoading={isSubmitting}
                    disabled={isSubmitting || (!isDirty && !!contact)}
                    fullWidth
                >
                    {contact ? 'Update' : 'Create'}
                </Button>
            </div>
        </form>
    )
}
