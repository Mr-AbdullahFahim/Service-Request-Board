"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Suspense } from "react";

function StatusFilterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentStatus = searchParams.get("status") || "All";

  const handleValueChange = (value: string | null) => {
    if (!value) return;
    const params = new URLSearchParams(searchParams.toString());
    if (value === "All") {
      params.delete("status");
    } else {
      params.set("status", value);
    }
    const query = params.toString();
    router.push(query ? `/?${query}` : "/");
  };

  return (
    <Select value={currentStatus} onValueChange={handleValueChange}>
      <SelectTrigger className="w-full sm:w-[180px]">
        <SelectValue placeholder="Filter by Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All">All Statuses</SelectItem>
        <SelectItem value="Open">Open</SelectItem>
        <SelectItem value="In Progress">In Progress</SelectItem>
        <SelectItem value="Closed">Closed</SelectItem>
      </SelectContent>
    </Select>
  );
}

export function StatusFilter() {
  return (
    <Suspense fallback={<div className="h-10 w-[180px] bg-slate-100 dark:bg-slate-800 animate-pulse rounded-md" />}>
      <StatusFilterContent />
    </Suspense>
  );
}
