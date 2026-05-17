"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Suspense, useState, useEffect } from "react";

function SearchBarContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get("search") || "";
  const [value, setValue] = useState(currentSearch);

  useEffect(() => {
    if (currentSearch === value) return;

    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set("search", value);
      } else {
        params.delete("search");
      }
      const query = params.toString();
      const newPath = query ? `/?${query}` : "/";
      
      router.push(newPath);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [value, currentSearch, router, searchParams]);

  return (
    <div className="relative w-full sm:w-[250px]">
      <Search className="absolute left-2.5 top-3 h-4 w-4 text-slate-500" />
      <Input
        type="text"
        placeholder="Search keywords..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="pl-9 h-10"
      />
    </div>
  );
}

export function SearchBar() {
  return (
    <Suspense fallback={<div className="h-10 w-[250px] bg-slate-100 dark:bg-slate-800 animate-pulse rounded-md" />}>
      <SearchBarContent />
    </Suspense>
  );
}
