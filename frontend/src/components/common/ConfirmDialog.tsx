import { AlertTriangle } from "lucide-react";

interface ConfirmDialogProps {
    isOpen: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
    variant?: 'danger' | 'warning';
}

export default function ConfirmDialog({
    isOpen,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    onConfirm,
    onCancel,
    variant = 'danger',
}: ConfirmDialogProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="p-6">
                    <div className="flex items-start gap-4">
                        <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${variant === 'danger' ? 'bg-red-50' : 'bg-yellow-50'
                                }`}
                        >
                            <AlertTriangle
                                className={`w-6 h-6 ${variant === 'danger' ? 'text-red-500' : 'text-yellow-500'
                                    }`}
                            />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-ios-label mb-2">
                                {title}
                            </h3>
                            <p className="text-sm text-ios-secondaryLabel">{message}</p>
                        </div>
                    </div>
                </div>
                <div className="flex gap-3 p-4 bg-ios-gray border-t border-ios-separator">
                    <button
                        onClick={onCancel}
                        className="flex-1 px-4 py-3 bg-white text-ios-blue rounded-lg font-semibold active:bg-gray-100 transition-all"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`flex-1 px-4 py-3 text-white rounded-lg font-semibold active:opacity-80 transition-all ${variant === 'danger' ? 'bg-red-500' : 'bg-yellow-500'
                            }`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    )
}
