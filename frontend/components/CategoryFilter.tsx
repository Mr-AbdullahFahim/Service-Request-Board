"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Suspense } from "react";

function CategoryFilterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "All";

  const handleValueChange = (value: string | null) => {
    if (!value) return;
    if (value === "All") {
      router.push("/");
    } else {
      router.push(`/?category=${value}`);
    }
  };

  return (
    <Select value={currentCategory} onValueChange={handleValueChange}>
      <SelectTrigger className="w-full sm:w-[180px]">
        <SelectValue placeholder="Filter by Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All">All Categories</SelectItem>
        <SelectItem value="Plumbing">Plumbing</SelectItem>
        <SelectItem value="Electrical">Electrical</SelectItem>
        <SelectItem value="Painting">Painting</SelectItem>
        <SelectItem value="Joinery">Joinery</SelectItem>
        <SelectItem value="HVAC">HVAC</SelectItem>
        <SelectItem value="Other">Other</SelectItem>
      </SelectContent>
    </Select>
  );
}

export function CategoryFilter() {
  return (
    <Suspense fallback={<div className="h-10 w-[180px] bg-slate-100 dark:bg-slate-800 animate-pulse rounded-md" />}>
      <CategoryFilterContent />
    </Suspense>
  );
}
