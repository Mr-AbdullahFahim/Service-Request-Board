import { Job } from "@/types/job";
import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft, MapPin, CalendarDays, Briefcase, User, Mail } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { StatusBadge } from "@/components/StatusBadge";
import { JobDetailActions } from "@/components/JobDetailActions";

export const dynamic = "force-dynamic";

async function getJob(id: string) {
  const res = await fetch(`${process.env.BACKEND_URL}/jobs/${id}`, { cache: "no-store" });
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error("Failed to fetch job");
  }
  const data = await res.json();
  return data as Job;
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const job = await getJob(resolvedParams.id);

  if (!job) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Link href="/" className={buttonVariants({ variant: "ghost", className: "mb-4" })}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Link>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <CardTitle className="text-xl font-bold">{job.title}</CardTitle>
              <StatusBadge status={job.status} />
            </div>
            <CardDescription className="flex items-center gap-4 text-sm mt-2">
              <span className="flex items-center gap-1.5">
                <Briefcase className="h-4 w-4" /> {job.category}
              </span>
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" /> {format(new Date(job.createdAt), "PPP")}
              </span>
            </CardDescription>
          </div>
          <JobDetailActions job={job} />
        </CardHeader>
        
        <CardContent className="py-6 space-y-8">
          <div>
            <h3 className="text-lg font-semibold mb-3">Description</h3>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
              {job.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-lg border">
            <div>
              <h3 className="text-sm font-semibold text-slate-500 mb-4 uppercase tracking-wider">Location Info</h3>
              <div className="flex items-start gap-2.5">
                <MapPin className="h-5 w-5 text-slate-400 mt-0.5" />
                <span className="text-slate-900 dark:text-slate-100">{job.location}</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-slate-500 mb-4 uppercase tracking-wider">Contact Info</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <User className="h-5 w-5 text-slate-400" />
                  <span className="text-slate-900 dark:text-slate-100">{job.contactName}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="h-5 w-5 text-slate-400" />
                  <a href={`mailto:${job.contactEmail}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                    {job.contactEmail}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
