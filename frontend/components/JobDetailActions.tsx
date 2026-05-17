"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Job, JobStatus } from "@/types/job";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2, RefreshCw } from "lucide-react";

interface JobDetailActionsProps {
  job: Job;
}

export function JobDetailActions({ job }: JobDetailActionsProps) {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [status, setStatus] = useState<JobStatus>(job.status);

  const handleStatusChange = async (newStatus: JobStatus) => {
    setIsUpdating(true);
    setStatus(newStatus);
    try {
      const response = await fetch(`/api/jobs/${job._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      toast.success("Status updated successfully!");
      router.refresh();
    } catch (error) {
      toast.error("Failed to update status. Please try again.");
      setStatus(job.status); // revert on failure
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this service request? This action cannot be undone.")) {
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/jobs/${job._id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete request");
      }

      toast.success("Service request deleted successfully!");
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete request. Please try again.");
      console.error(error);
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-slate-500">Status:</span>
        <Select value={status} onValueChange={(value) => value && handleStatusChange(value as JobStatus)} disabled={isUpdating}>
          <SelectTrigger className="w-[160px]">
            {isUpdating ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : null}
            <SelectValue placeholder="Update Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Open">Open</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Button variant="destructive" onClick={handleDelete} disabled={isDeleting} className="w-full sm:w-auto">
        {isDeleting ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Trash2 className="mr-2 h-4 w-4" />
        )}
        Delete Request
      </Button>
    </div>
  );
}
