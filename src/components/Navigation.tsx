import Link from 'next/link';
import { Camera, Home, CreditCard, FileText } from 'lucide-react';

export default function Navigation() {
    return (
        <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-orange-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">PT</span>
                        </div>
                        <span className="text-xl font-bold text-gray-900">Puri Tours</span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="flex items-center space-x-8">
                        <Link
                            href="/"
                            className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
                        >
                            <Home className="h-4 w-4" />
                            <span>Home</span>
                        </Link>
                        <Link
                            href="/gallery"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
                        >
                            <Camera className="h-4 w-4" />
                            <span>Gallery</span>
                        </Link>
                        <Link
                            href="/payment-details"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
                        >
                            <CreditCard className="h-4 w-4" />
                            <span>Payment Details</span>
                        </Link>
                        <Link
                            href="/terms-conditions"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
                        >
                            <FileText className="h-4 w-4" />
                            <span>Terms & Conditions</span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
