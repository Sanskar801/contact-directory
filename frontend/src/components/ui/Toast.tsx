import clsx from "clsx";
import { CheckCircle, XCircle, Info, X } from "lucide-react";
import { useEffect, useState } from "react";

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
    message: string;
    type: ToastType;
    onClose: () => void;
    duration?: number;
}

export default function Toast({
    message,
    type,
    onClose,
    duration = 3000,
}: ToastProps) {

    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const icons = {
        success: <CheckCircle className="h-5 w-5" />,
        error: <XCircle className="h-5 w-5" />,
        info: <Info className="h-5 w-5" />,
    };

    const styles = {
        success: 'bg-[var(--color-success)] text-white',
        error: 'bg-[var(--color-danger)] text-white',
        info: 'bg-[var(--color-primary)] text-white',
    };
    return (
        <div
            className={clsx(
                'pointer-events-auto flex items-center gap-3 rounded-lg px-4 py-3 shadow-lg transition-all duration-300',
                styles[type],
                isVisible
                    ? 'translate-y-0 opacity-100'
                    : '-translate-y-2 opacity-0'
            )}
        >
            <div className="shrink-0">{icons[type]}</div>
            <p className="flex-1 text-sm font-medium">{message}</p>
            <button
                onClick={() => {
                    setIsVisible(false);
                    setTimeout(onClose, 300);
                }}
                className="shrink-0 rounded-full p-1 hover:bg-white/20"
            >
                <X className="h-4 w-4" />
            </button>
        </div>
    )
}
