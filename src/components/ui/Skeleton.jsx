export function CardSkeleton({ n = 4 }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-1 mb-8" aria-hidden="true">
      {Array.from({ length: n }).map((_, i) => (
        <div key={i} className="p-3">
          <div className="aspect-square rounded-lg bg-(--hover) animate-pulse" />
          <div className="mt-3 h-4 w-3/4 rounded bg-(--hover) animate-pulse" />
          <div className="mt-2 h-3 w-1/2 rounded bg-(--hover) animate-pulse" />
        </div>
      ))}
    </div>
  );
}

export function RowSkeleton({ n = 6 }) {
  return (
    <div aria-hidden="true">
      {Array.from({ length: n }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 px-3 py-2">
          <div className="size-11 rounded-md bg-(--hover) animate-pulse" />
          <div className="flex-1">
            <div className="h-4 w-1/3 rounded bg-(--hover) animate-pulse" />
            <div className="mt-2 h-3 w-1/4 rounded bg-(--hover) animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}