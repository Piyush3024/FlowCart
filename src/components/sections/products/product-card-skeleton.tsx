import { Skeleton } from '@/components/ui/skeleton';

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-3" aria-hidden="true">
      {/* Image */}
      <Skeleton className="aspect-[3/4] w-full rounded-xl" />

      {/* Text lines */}
      <div className="flex flex-col gap-2 px-0">
        <Skeleton className="h-3 w-16 rounded" />
        <Skeleton className="h-4 w-3/4 rounded" />
        <Skeleton className="h-3 w-20 rounded" />
        <Skeleton className="h-4 w-16 rounded" />
      </div>
    </div>
  );
}
