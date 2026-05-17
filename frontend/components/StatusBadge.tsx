import { Badge } from "@/components/ui/badge";
import { JobStatus } from "@/types/job";

interface StatusBadgeProps {
  status: JobStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  switch (status) {
    case "Open":
      return <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200">Open</Badge>;
    case "In Progress":
      return <Badge variant="default" className="bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-900 dark:text-amber-200">In Progress</Badge>;
    case "Closed":
      return <Badge variant="outline" className="text-gray-500 border-gray-300 dark:text-gray-400 dark:border-gray-700">Closed</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
}
