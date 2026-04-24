"use client";

import Skeleton from "@/app/components/ui/Skeleton";
import { ArrowLeft } from "lucide-react";

export default function VerifySkeleton() {
  return (
    <div className="min-h-screen bg-white px-6 py-4">
      {/* Back Button Placeholder */}
      <div className="mb-4">
        <ArrowLeft size={28} className="text-gray-300" />
      </div>

      {/* Title Skeleton */}
      <Skeleton className="h-8 w-48 mb-2 rounded-lg" />

      {/* Subtitle Skeleton */}
      <div className="mb-6 space-y-2">
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-2/3 rounded" />
      </div>

      {/* OTP Boxes Skeleton */}
      <div className="flex justify-between gap-2 mb-6">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="w-12 h-12 rounded-md" />
        ))}
      </div>

      {/* Timer & Resend Skeleton */}
      <div className="flex justify-between items-center mt-2">
        <Skeleton className="h-4 w-32 rounded" />
        <Skeleton className="h-4 w-12 rounded" />
      </div>

      {/* Verify Button Skeleton */}
      <Skeleton className="w-full h-12 mt-6 rounded-xl" />
    </div>
  );
}
