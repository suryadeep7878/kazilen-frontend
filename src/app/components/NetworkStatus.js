"use client";

import { useState, useEffect } from "react";
import { WifiOff, Wifi } from "lucide-react";

export default function NetworkStatus() {
  const [isOnline, setIsOnline] = useState(true);
  const [showOnlineToast, setShowOnlineToast] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsOnline(navigator.onLine);

      const handleOnline = () => {
        setIsOnline(true);
        setShowOnlineToast(true);
        setTimeout(() => setShowOnlineToast(false), 3000);
      };
      
      const handleOffline = () => {
        setIsOnline(false);
        setShowOnlineToast(false);
      };

      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);

      return () => {
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
      };
    }
  }, []);

  if (isOnline && !showOnlineToast) return null;

  if (showOnlineToast) {
    return (
      <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-2 rounded-full flex items-center gap-2 z-[9999] shadow-lg animate-in fade-in slide-in-from-top-4 duration-300">
        <Wifi className="w-4 h-4" />
        <span className="text-sm font-semibold">Back Online</span>
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 right-0 bg-gray-900 text-white p-3 flex items-center justify-center gap-2 z-[9999] text-xs font-medium shadow-md border-b border-gray-700 animate-in slide-in-from-top duration-300">
      <WifiOff className="w-4 h-4 text-yellow-400" />
      <span>You are offline. Some features may be limited.</span>
    </div>
  );
}
