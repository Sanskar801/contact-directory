import clsx from 'clsx';
import { Loader2 } from 'lucide-react';
import { forwardRef, type ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    function Button({
        children,
        variant = 'primary',
        size = 'md',
        isLoading = false,
        fullWidth = false,
        className,
        disabled,
        ...props
    },
        ref) {

        const baseStyles =
            'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

        const variants = {
            primary:
                'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] focus-visible:ring-[var(--color-primary)]',
            secondary:
                'bg-gray-200 text-gray-900 hover:bg-gray-300 focus-visible:ring-gray-500',
            danger:
                'bg-[var(--color-danger)] text-white hover:bg-red-600 focus-visible:ring-[var(--color-danger)]',
            ghost:
                'bg-transparent text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-500',
        };

        const sizes = {
            sm: 'text-sm px-3 py-1.5 gap-1.5',
            md: 'text-base px-4 py-2 gap-2',
            lg: 'text-lg px-6 py-3 gap-2',
        };

        return (
            <button
                ref={ref}
                className={clsx(
                    baseStyles,
                    variants[variant],
                    sizes[size],
                    fullWidth && 'w-full',
                    className
                )}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                {children}
            </button>
        );
    }
);

export default Button;