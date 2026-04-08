import { useState } from "react";
import { useParams, useLocation, Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useGetJob, useCreateApplication, getGetJobQueryKey } from "@workspace/api-client-react";
import { ArrowLeft, CheckCircle2, UploadCloud, Building2, MapPin } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Footer } from "@/components/layout/Footer";

const applySchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  mobileNumber: z.string().min(10, "Valid mobile number is required"),
  email: z.string().email("Valid email is required"),
  location: z.string().min(2, "Location is required"),
  experience: z.string().min(1, "Experience is required"),
  skills: z.string().min(2, "Skills are required"),
});

type ApplyFormValues = z.infer<typeof applySchema>;

export default function ApplyPage() {
  const params = useParams();
  const jobId = params.jobId ? parseInt(params.jobId, 10) : undefined;
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const { data: job, isLoading: isJobLoading } = useGetJob(jobId!, { 
    query: { enabled: !!jobId, queryKey: getGetJobQueryKey(jobId!) } 
  });
  
  const createApplication = useCreateApplication();

  const form = useForm<ApplyFormValues>({
    resolver: zodResolver(applySchema),
    defaultValues: {
      fullName: "",
      mobileNumber: "",
      email: "",
      location: "",
      experience: "",
      skills: "",
    },
  });

  const onSubmit = (data: ApplyFormValues) => {
    // We create a custom body to match the API expectation
    createApplication.mutate({
      data: {
        ...data,
        jobId: jobId || null,
        resume: resumeFile || null,
      } as any // Cast needed due to Blob vs File typing in generated API client
    }, {
      onSuccess: () => {
        setIsSuccess(true);
        toast({
          title: "Application Submitted",
          description: "Your application has been received successfully.",
        });
      },
      onError: () => {
        toast({
          variant: "destructive",
          title: "Submission Failed",
          description: "There was an error submitting your application. Please try again.",
        });
      }
    });
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-muted/20 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-4">
          <Card className="max-w-md w-full text-center border-primary/20 shadow-lg">
            <CardContent className="pt-10 pb-10 flex flex-col items-center">
              <div className="h-20 w-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Application Successful!</h2>
              <p className="text-muted-foreground mb-8">
                Thank you for applying. The employer will review your profile and contact you soon.
              </p>
              <div className="flex flex-col gap-3 w-full">
                <Button onClick={() => setLocation("/")} className="w-full">
                  Browse More Jobs
                </Button>
                <Button variant="outline" onClick={() => setLocation("/resume-builder")} className="w-full">
                  Create a Professional Resume
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12 max-w-3xl">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Jobs
        </Link>
        
        <Card className="border-border shadow-sm">
          <CardHeader className="bg-muted/30 border-b pb-6">
            {jobId && job ? (
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div>
                  <CardTitle className="text-2xl mb-2">{job.title}</CardTitle>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Building2 className="mr-1.5 h-4 w-4" />
                      {job.company}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-1.5 h-4 w-4" />
                      {job.location}
                    </div>
                  </div>
                </div>
                <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap">
                  {job.type}
                </div>
              </div>
            ) : jobId && isJobLoading ? (
              <div className="animate-pulse space-y-3">
                <div className="h-8 bg-muted rounded w-1/2"></div>
                <div className="h-4 bg-muted rounded w-1/3"></div>
              </div>
            ) : (
              <div>
                <CardTitle className="text-2xl">General Application</CardTitle>
                <CardDescription className="text-base mt-2">
                  Submit your profile to our talent pool and we'll match you with suitable opportunities.
                </CardDescription>
              </div>
            )}
          </CardHeader>
          <CardContent className="pt-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Rohan Patil" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="rohan@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="mobileNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mobile Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+91 9876543210" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Location / City</FormLabel>
                        <FormControl>
                          <Input placeholder="Pune, Maharashtra" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Total Experience</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Fresher, 2 Years, 5+ Years" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="skills"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Key Skills</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="e.g. React, Node.js, Communication, Sales (comma separated)" 
                            className="min-h-[100px] resize-y"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-3 pt-4 border-t">
                  <Label className="text-base font-medium">Upload Resume (PDF)</Label>
                  <div className="border-2 border-dashed rounded-xl p-8 text-center bg-muted/20 hover:bg-muted/50 transition-colors">
                    <Input 
                      type="file" 
                      accept=".pdf" 
                      className="hidden" 
                      id="resume-upload"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) setResumeFile(file);
                      }}
                    />
                    <label htmlFor="resume-upload" className="cursor-pointer flex flex-col items-center">
                      <UploadCloud className="h-10 w-10 text-muted-foreground mb-3" />
                      <span className="font-medium mb-1">
                        {resumeFile ? resumeFile.name : "Click to upload or drag and drop"}
                      </span>
                      <span className="text-sm text-muted-foreground">PDF files up to 5MB</span>
                      <Button type="button" variant="secondary" className="mt-4 pointer-events-none">
                        Select File
                      </Button>
                    </label>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 text-lg font-semibold mt-4" 
                  disabled={createApplication.isPending}
                >
                  {createApplication.isPending ? "Submitting..." : "Submit Application"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
