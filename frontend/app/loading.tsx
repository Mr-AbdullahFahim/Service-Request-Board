export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <div className="h-8 w-48 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-md mb-2"></div>
          <div className="h-4 w-64 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-md"></div>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-10 w-[180px] bg-slate-200 dark:bg-slate-800 animate-pulse rounded-md"></div>
          <div className="h-10 w-32 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-md"></div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-48 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-xl"></div>
        ))}
      </div>
    </div>
  );
}
