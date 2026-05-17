export type JobStatus = 'Open' | 'In Progress' | 'Closed';

export interface Job {
  _id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  contactName: string;
  contactEmail: string;
  status: JobStatus;
  createdAt: string;
}
