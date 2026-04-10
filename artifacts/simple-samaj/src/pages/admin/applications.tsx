import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink } from "lucide-react";
import { useAdminListApplications, useAdminUpdateApplicationStatus, useAdminListJobs, getAdminListApplicationsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function AdminApplications() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [jobFilter, setJobFilter] = useState<string>("all");
  const [selectedApp, setSelectedApp] = useState<any | null>(null);

  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: jobs = [] } = useAdminListJobs();
  
  // Params object
  const params: any = {};
  if (statusFilter !== "all") params.status = statusFilter;
  if (jobFilter !== "all") params.jobId = parseInt(jobFilter);

  const { data: applications = [], isLoading } = useAdminListApplications(params);
  const updateStatus = useAdminUpdateApplicationStatus();

  const handleStatusChange = (id: number, newStatus: "pending" | "called" | "selected" | "rejected") => {
    updateStatus.mutate({ id, data: { status: newStatus } }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getAdminListApplicationsQueryKey() });
        toast({ title: "Status updated" });
      }
    });
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending': return <Badge variant="secondary">Pending</Badge>;
      case 'called': return <Badge variant="default" className="bg-blue-500 hover:bg-blue-600">Called</Badge>;
      case 'selected': return <Badge variant="default" className="bg-green-500 hover:bg-green-600">Selected</Badge>;
      case 'rejected': return <Badge variant="destructive">Rejected</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Applications</h1>
          <p className="text-muted-foreground">Review and manage candidate applications</p>
        </div>
        <div className="flex gap-3">
          <Select value={jobFilter} onValueChange={setJobFilter}>
            <SelectTrigger className="w-[200px] bg-background">
              <SelectValue placeholder="Filter by Job" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Jobs</SelectItem>
              {jobs.map(job => (
                <SelectItem key={job.id} value={job.id.toString()}>{job.title}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px] bg-background">
              <SelectValue placeholder="Filter Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="called">Called</SelectItem>
              <SelectItem value="selected">Selected</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="bg-background rounded-xl border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Candidate</TableHead>
              <TableHead>Applied For</TableHead>
              <TableHead>Experience</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow><TableCell colSpan={5} className="text-center py-8">Loading...</TableCell></TableRow>
            ) : applications.length === 0 ? (
              <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No applications found</TableCell></TableRow>
            ) : applications.map((app) => (
              <TableRow key={app.id}>
                <TableCell>
                  <div className="font-medium">{app.fullName}</div>
                  <div className="text-xs text-muted-foreground">{app.mobileNumber}</div>
                  <div className="text-xs text-muted-foreground">{app.location}</div>
                </TableCell>
                <TableCell>
                  {app.jobTitle ? (
                    <div>
                      <div className="font-medium">{app.jobTitle}</div>
                      <div className="text-xs text-muted-foreground">{app.jobCompany}</div>
                    </div>
                  ) : (
                    <span className="italic text-muted-foreground">General Application</span>
                  )}
                </TableCell>
                <TableCell>{app.experience}</TableCell>
                <TableCell>
                  <Select 
                    value={app.status} 
                    onValueChange={(v: any) => handleStatusChange(app.id, v)}
                  >
                    <SelectTrigger className="w-[130px] h-8">
                      <SelectValue>{getStatusBadge(app.status)}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="called">Called</SelectItem>
                      <SelectItem value="selected">Selected</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-right">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setSelectedApp(app)}>
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Application Details</DialogTitle>
                      </DialogHeader>
                      {selectedApp && (
                        <div className="space-y-4 mt-4">
                          <div className="grid grid-cols-1 gap-4 border-b pb-4 sm:grid-cols-2">
                            <div>
                              <div className="text-sm text-muted-foreground">Name</div>
                              <div className="font-medium break-words">{selectedApp.fullName}</div>
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground">Email</div>
                              <div className="font-medium break-words">{selectedApp.email}</div>
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground">Mobile</div>
                              <div className="font-medium break-words">{selectedApp.mobileNumber}</div>
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground">Location</div>
                              <div className="font-medium break-words">{selectedApp.location}</div>
                            </div>
                          </div>
                          
                          <div className="border-b pb-4">
                            <div className="text-sm text-muted-foreground">Applied For</div>
                            <div className="font-medium">{selectedApp.jobTitle || 'General Application'}</div>
                            {selectedApp.jobCompany && <div className="text-sm">{selectedApp.jobCompany}</div>}
                          </div>

                          <div className="border-b pb-4">
                            <div className="text-sm text-muted-foreground">Skills</div>
                            <div className="mt-1 whitespace-pre-wrap text-sm">{selectedApp.skills}</div>
                          </div>

                          <div className="flex justify-between items-center pt-2">
                            <div>
                              <div className="text-sm text-muted-foreground">Current Status</div>
                              <div className="mt-1">{getStatusBadge(selectedApp.status)}</div>
                            </div>
                            {selectedApp.resumeUrl ? (
                              <a
                                href={`${import.meta.env.VITE_API_BASE_URL ?? (import.meta.env.DEV ? "http://localhost:8080" : "")}${selectedApp.resumeUrl}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                download
                              >
                                <Button className="gap-2">
                                  <Download className="w-4 h-4" /> Download Resume
                                </Button>
                              </a>
                            ) : (
                              <span className="text-sm text-muted-foreground italic">No resume attached</span>
                            )}
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AdminLayout>
  );
}
