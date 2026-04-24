import Skeleton from "./components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      {/* Search/Header Skeleton */}
      <div className="p-4 bg-white border-b mb-4">
        <Skeleton className="h-12 w-full rounded-2xl" />
      </div>

      <div className="px-4 space-y-4">
        {/* Chips/Category Skeleton */}
        <div className="flex gap-2 overflow-x-hidden">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-10 w-24 rounded-full flex-shrink-0" />
          ))}
        </div>

        {/* List Skeletons */}
        <div className="space-y-4 mt-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white border rounded-2xl p-4 flex gap-4 h-32 items-center">
              <Skeleton className="h-24 w-24 rounded-xl flex-shrink-0" />
              <div className="flex-1 space-y-3">
                <Skeleton className="h-5 w-3/4 rounded" />
                <Skeleton className="h-4 w-1/2 rounded" />
                <Skeleton className="h-4 w-1/4 rounded mt-auto" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
