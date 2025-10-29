import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorMessageProps {
    message?: string;
    onRetry?: () => void;
}

export default function ErrorMessage({ message = 'Something went wrong. Please try again.',
    onRetry }: ErrorMessageProps) {
    return (
        <div className="flex flex-col items-center justify-center gap-4 py-12 px-4">
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <div className="text-center max-w-md">
                <h3 className="text-lg font-semibold text-ios-label mb-2">
                    Oops!
                </h3>
                <p className="text-sm text-ios-secondaryLabel">{message}</p>
            </div>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="flex items-center gap-2 px-4 py-2 bg-ios-blue text-white rounded-lg font-semibold active:opacity-80 transition-all"
                >
                    <RefreshCw className="w-4 h-4" />
                    Try Again
                </button>
            )}
        </div>
    )
}
