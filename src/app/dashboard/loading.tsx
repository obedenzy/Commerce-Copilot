import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="grid h-screen w-full grid-cols-1 md:grid-cols-[450px_1fr]">
      {/* Chat Panel Skeleton */}
      <div className="flex flex-col border-r bg-card p-4">
        <div className="flex items-center justify-between p-2">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto p-2">
          <div className="flex items-start gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
          <div className="flex items-start gap-3 justify-end">
             <div className="flex-1 space-y-2 max-w-sm text-right">
              <Skeleton className="h-4 w-24 ml-auto" />
              <Skeleton className="h-8 w-3/4 ml-auto" />
            </div>
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
          <div className="flex items-start gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-24 w-full" />
            </div>
          </div>
        </div>
        <div className="mt-auto p-2">
          <Skeleton className="h-20 w-full rounded-lg" />
        </div>
      </div>

      {/* Results Panel Skeleton */}
      <div className="flex flex-col p-6">
        <Skeleton className="h-10 w-64 mb-6" />
        <div className="space-y-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    </div>
  );
}
