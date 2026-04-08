import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAdminListJobs, useAdminCreateJob, useAdminUpdateJob, useAdminDeleteJob, getAdminListJobsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Job, CreateJobBodyType } from "@workspace/api-client-react";

const jobSchema = z.object({
  title: z.string().min(2, "Title required"),
  company: z.string().min(2, "Company required"),
  type: z.enum(["IT", "Non-IT"]),
  location: z.string().min(2, "Location required"),
  salaryMin: z.coerce.number().optional().nullable(),
  salaryMax: z.coerce.number().optional().nullable(),
  experience: z.string().min(1, "Experience required"),
  description: z.string().min(10, "Description required"),
  isActive: z.boolean().default(true),
});

type JobFormValues = z.infer<typeof jobSchema>;

export default function AdminJobs() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: jobs = [], isLoading } = useAdminListJobs();
  const createJob = useAdminCreateJob();
  const updateJob = useAdminUpdateJob();
  const deleteJob = useAdminDeleteJob();

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: "",
      company: "",
      type: "IT",
      location: "",
      salaryMin: null,
      salaryMax: null,
      experience: "",
      description: "",
      isActive: true,
    }
  });

  const handleOpenDialog = (job?: Job) => {
    if (job) {
      setEditingJob(job);
      form.reset({
        title: job.title,
        company: job.company,
        type: job.type,
        location: job.location,
        salaryMin: job.salaryMin,
        salaryMax: job.salaryMax,
        experience: job.experience,
        description: job.description,
        isActive: job.isActive,
      });
    } else {
      setEditingJob(null);
      form.reset({
        title: "", company: "", type: "IT", location: "",
        salaryMin: null, salaryMax: null, experience: "", description: "", isActive: true
      });
    }
    setIsDialogOpen(true);
  };

  const onSubmit = (data: JobFormValues) => {
    if (editingJob) {
      updateJob.mutate({ id: editingJob.id, data }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getAdminListJobsQueryKey() });
          setIsDialogOpen(false);
          toast({ title: "Job updated successfully" });
        }
      });
    } else {
      createJob.mutate({ data }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getAdminListJobsQueryKey() });
          setIsDialogOpen(false);
          toast({ title: "Job created successfully" });
        }
      });
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this job?")) {
      deleteJob.mutate({ id }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getAdminListJobsQueryKey() });
          toast({ title: "Job deleted" });
        }
      });
    }
  };

  const handleToggleActive = (job: Job, checked: boolean) => {
    const data = {
      title: job.title,
      company: job.company,
      type: job.type as CreateJobBodyType,
      location: job.location,
      salaryMin: job.salaryMin,
      salaryMax: job.salaryMax,
      experience: job.experience,
      description: job.description,
      isActive: checked,
    };
    updateJob.mutate({ id: job.id, data }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getAdminListJobsQueryKey() });
      }
    });
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Job Listings</h1>
          <p className="text-muted-foreground">Manage job postings on the platform</p>
        </div>
        <Button onClick={() => handleOpenDialog()} className="gap-2">
          <Plus className="w-4 h-4" /> Add New Job
        </Button>
      </div>

      <div className="bg-background rounded-xl border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow><TableCell colSpan={6} className="text-center py-8">Loading...</TableCell></TableRow>
            ) : jobs.length === 0 ? (
              <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No jobs found</TableCell></TableRow>
            ) : jobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell className="font-medium">{job.title}</TableCell>
                <TableCell>{job.company}</TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell><Badge variant="outline">{job.type}</Badge></TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={job.isActive} 
                      onCheckedChange={(c) => handleToggleActive(job, c)} 
                    />
                    <span className="text-sm text-muted-foreground">{job.isActive ? 'Active' : 'Inactive'}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(job)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDelete(job.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingJob ? 'Edit Job' : 'Add New Job'}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="title" render={({ field }) => (
                  <FormItem><FormLabel>Job Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage/></FormItem>
                )}/>
                <FormField control={form.control} name="company" render={({ field }) => (
                  <FormItem><FormLabel>Company Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage/></FormItem>
                )}/>
                <FormField control={form.control} name="type" render={({ field }) => (
                  <FormItem><FormLabel>Job Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger></FormControl>
                      <SelectContent><SelectItem value="IT">IT</SelectItem><SelectItem value="Non-IT">Non-IT</SelectItem></SelectContent>
                    </Select>
                  <FormMessage/></FormItem>
                )}/>
                <FormField control={form.control} name="location" render={({ field }) => (
                  <FormItem><FormLabel>Location</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage/></FormItem>
                )}/>
                <FormField control={form.control} name="salaryMin" render={({ field }) => (
                  <FormItem><FormLabel>Min Salary</FormLabel><FormControl><Input type="number" {...field} value={field.value || ''} /></FormControl><FormMessage/></FormItem>
                )}/>
                <FormField control={form.control} name="salaryMax" render={({ field }) => (
                  <FormItem><FormLabel>Max Salary</FormLabel><FormControl><Input type="number" {...field} value={field.value || ''} /></FormControl><FormMessage/></FormItem>
                )}/>
                <FormField control={form.control} name="experience" render={({ field }) => (
                  <FormItem className="col-span-2"><FormLabel>Experience Required</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage/></FormItem>
                )}/>
                <FormField control={form.control} name="description" render={({ field }) => (
                  <FormItem className="col-span-2"><FormLabel>Job Description</FormLabel><FormControl><Textarea rows={5} {...field} /></FormControl><FormMessage/></FormItem>
                )}/>
                <FormField control={form.control} name="isActive" render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 col-span-2">
                    <div className="space-y-0.5"><FormLabel className="text-base">Active Status</FormLabel></div>
                    <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                  </FormItem>
                )}/>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={createJob.isPending || updateJob.isPending}>
                  {createJob.isPending || updateJob.isPending ? 'Saving...' : 'Save Job'}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
