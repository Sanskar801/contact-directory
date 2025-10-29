import { Users } from 'lucide-react';

export default function Header() {
    return (
        <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur-lg">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-purple-600">
                        <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-lg font-semibold text-gray-900">
                            Contact Directory
                        </h1>
                        <p className="text-xs text-gray-500">Manage your contacts</p>
                    </div>
                </div>
            </div>
        </header>
    );
}