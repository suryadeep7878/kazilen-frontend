"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";

export default function ErrorState({ 
  title = "Something went wrong", 
  message = "We couldn't load the data. Please try again.", 
  onRetry 
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-red-50 rounded-2xl border border-red-100 my-4">
      <div className="bg-red-100 p-3 rounded-full mb-4">
        <AlertTriangle className="w-8 h-8 text-red-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-600 mb-6 max-w-xs">{message}</p>
      
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 bg-white border border-gray-200 px-6 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>
      )}
    </div>
  );
}
