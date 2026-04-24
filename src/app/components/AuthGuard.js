"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Skeleton from "./ui/Skeleton";
import SafeStorage from "../../utils/storage";

// Define all routes that do not require authentication
const PUBLIC_PATHS = [
  "/",
  "/login",
  "/create-account",
  "/verify",
];

export default function AuthGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const isPublicPath = PUBLIC_PATHS.includes(pathname);
      const token = SafeStorage.get("session_token");

      if (!isPublicPath && !token) {
        router.replace("/login");
      } else {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [pathname, router]);

  // Premium transition UI instead of raw spinner
  if (isChecking && !PUBLIC_PATHS.includes(pathname)) {
    return (
      <div className="min-h-screen bg-white">
        {/* Placeholder for Header */}
        <div className="h-16 border-b flex items-center px-4">
          <Skeleton className="h-8 w-32 rounded-lg" />
        </div>
        
        {/* Placeholder for Body Content */}
        <div className="p-4 space-y-6">
          <Skeleton className="h-40 w-full rounded-2xl" />
          <div className="space-y-3">
            <Skeleton className="h-6 w-3/4 rounded-lg" />
            <Skeleton className="h-4 w-1/2 rounded-lg" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-12 rounded-xl" />
            <Skeleton className="h-12 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
