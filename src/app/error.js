"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global Error Caught:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
      <div className="bg-red-100 p-4 rounded-full mb-6">
        <AlertCircle className="w-12 h-12 text-red-600" />
      </div>
      
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Something went wrong!
      </h1>
      <p className="text-gray-600 mb-8 max-w-md">
        We encountered an unexpected error. Don't worry, our team has been notified.
        {error?.message && (
          <span className="block mt-2 text-xs text-red-500 font-mono bg-red-50 p-2 rounded">
            {error.message}
          </span>
        )}
      </p>

      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
        <button
          onClick={() => reset()}
          className="flex items-center justify-center gap-2 bg-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-pink-600 transition-colors shadow-md"
        >
          <RefreshCw className="w-5 h-5" />
          Try Again
        </button>
        
        <Link
          href="/"
          className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-sm"
        >
          <Home className="w-5 h-5" />
          Go Home
        </Link>
      </div>
    </div>
  );
}
