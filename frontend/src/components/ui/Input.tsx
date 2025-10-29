import clsx from "clsx";
import { forwardRef, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    function Button({ label, error, helperText, className, id, ...props }, ref) {
        const inputId = id || label?.toLowerCase().replace(/\s/g, '-');

        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="mb-1.5 block text-sm font-medium text-gray-700"
                    >
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    id={inputId}
                    className={clsx(
                        'w-full rounded-lg border bg-white px-3 py-2 text-base transition-colors',
                        'placeholder:text-gray-400',
                        'focus:outline-none focus:ring-2 focus:ring-offset-1',
                        error
                            ? 'border-(--color-danger) focus:border-(--color-danger) focus:ring-(--color-danger)'
                            : 'border-gray-300 focus:border-(--color-primary) focus:ring-(--color-primary)',
                        'disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500',
                        className
                    )}
                    {...props}
                />
                {error && (
                    <p className="mt-1.5 text-sm text-(--color-danger)">{error}</p>
                )}
                {helperText && !error && (
                    <p className="mt-1.5 text-sm text-gray-500">{helperText}</p>
                )}
            </div>
        );
    }
);

export default Input;