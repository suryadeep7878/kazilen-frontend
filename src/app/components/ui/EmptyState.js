"use client";

import { Inbox } from "lucide-react";

export default function EmptyState({ 
  title = "No data available", 
  message = "There's nothing to show here at the moment.",
  icon: Icon = Inbox
}) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200 my-4">
      <div className="bg-white p-4 rounded-full shadow-sm mb-4">
        <Icon className="w-10 h-10 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-600 max-w-xs">{message}</p>
    </div>
  );
}
