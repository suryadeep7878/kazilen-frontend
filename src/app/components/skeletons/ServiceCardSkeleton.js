import Skeleton from "../ui/Skeleton";

export default function ServiceCardSkeleton() {
  return (
    <div className="w-full relative">
      <div className="flex items-start gap-4 border rounded-2xl p-4 shadow-sm bg-white mb-3">
        {/* Image Skeleton */}
        <Skeleton className="w-[90px] h-[90px] sm:w-[150px] sm:h-[150px] rounded-xl flex-shrink-0" />

        <div className="flex flex-col flex-1 justify-between self-stretch">
          {/* Header Skeleton */}
          <div className="flex justify-between items-start">
            <div className="space-y-2 flex-1">
              <Skeleton className="h-5 w-3/4 rounded" />
              <Skeleton className="h-4 w-1/2 rounded" />
            </div>
            <Skeleton className="w-12 h-6 rounded-md ml-2" />
          </div>

          {/* Description Skeleton */}
          <div className="mt-2 space-y-1.5 opacity-60">
            <Skeleton className="h-3.5 w-full rounded" />
            <Skeleton className="h-3.5 w-5/6 rounded" />
          </div>

          {/* Actions Skeleton */}
          <div className="flex justify-between items-end mt-4 gap-2">
            <Skeleton className="w-24 h-8 rounded-lg" />
            <div className="flex flex-col items-end space-y-2">
              <Skeleton className="w-16 h-4 rounded" />
              <Skeleton className="w-24 h-8 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
