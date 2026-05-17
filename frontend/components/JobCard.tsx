import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Job } from "@/types/job";
import { StatusBadge } from "./StatusBadge";
import { MapPin, CalendarDays, Briefcase } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  return (
    <Link href={`/jobs/${job._id}`} className="block transition-transform hover:scale-[1.02] h-full">
      <Card className="h-full flex flex-col hover:border-primary/50 transition-colors">
        <CardHeader>
          <div className="flex justify-between items-start gap-4">
            <CardTitle className="text-xl line-clamp-1">{job.title}</CardTitle>
            <StatusBadge status={job.status} />
          </div>
          <CardDescription className="flex items-center gap-1.5 text-sm">
            <Briefcase className="h-3.5 w-3.5" />
            {job.category}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <p className="text-muted-foreground text-sm line-clamp-2">
            {job.description}
          </p>
        </CardContent>
        <CardFooter className="flex justify-between text-xs text-muted-foreground border-t pt-4">
          <div className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            <span className="truncate max-w-[120px]">{job.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <CalendarDays className="h-3.5 w-3.5" />
            <span>{formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
