import { JobCard } from "@/components/JobCard";
import { JobFilters } from "@/components/JobFilters";
import { SearchBar } from "@/components/SearchBar";
import { buttonVariants } from "@/components/ui/button";
import { cookies } from "next/headers";
import { Job } from "@/types/job";
import Link from "next/link";
import { Plus } from "lucide-react";

export const dynamic = "force-dynamic";

async function getJobs(category?: string, status?: string, search?: string) {
  const url = new URL(`${process.env.BACKEND_URL}/jobs`);
  if (category && category !== "All") {
    url.searchParams.append("category", category);
  }
  if (status && status !== "All") {
    url.searchParams.append("status", status);
  }
  if (search) {
    url.searchParams.append("search", search);
  }
  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch jobs");
  }
  const data = await res.json();
  return data as Job[];
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const category = typeof params.category === "string" ? params.category : undefined;
  const status = typeof params.status === "string" ? params.status : undefined;
  const search = typeof params.search === "string" ? params.search : undefined;
  
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("user")?.value;
  let user = null;
  if (userCookie) {
    try {
      user = JSON.parse(userCookie);
    } catch(e) {}
  }
  
  let jobs: Job[] = [];
  try {
    jobs = await getJobs(category, status, search);
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Service Requests</h1>
          <p className="text-slate-500 mt-1">Manage and track your maintenance requests.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center w-full sm:w-auto gap-3 sm:gap-4 mt-4 sm:mt-0">
          <SearchBar />
          <JobFilters />
          {user && (
            <Link href="/jobs/new" className={buttonVariants({ className: "w-full sm:w-auto" })}>
              <Plus className="mr-2 h-4 w-4" /> New Request
            </Link>
          )}
        </div>
      </div>

      {jobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white/50 dark:bg-slate-900 rounded-lg border border-dashed border-slate-300 dark:border-slate-800">
          <p className="text-slate-500 mb-4">No service requests found.</p>
          {user && (
            <Link href="/jobs/new" className={buttonVariants({ variant: "default" })}>
              Create your first request
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
