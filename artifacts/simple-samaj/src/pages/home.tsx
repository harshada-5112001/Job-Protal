import { useState, useMemo } from "react";
import { Link } from "wouter";
import { Search, MapPin, Briefcase, Filter, Building2, IndianRupee } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useListJobs, useGetJobStats } from "@workspace/api-client-react";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "IT" | "Non-IT">("all");
  const [locationFilter, setLocationFilter] = useState("all");
  
  const { data: jobs = [], isLoading: isLoadingJobs } = useListJobs();
  const { data: stats, isLoading: isLoadingStats } = useGetJobStats();

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           job.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === "all" || job.type === typeFilter;
      const matchesLocation = locationFilter === "all" || job.location === locationFilter;
      
      return matchesSearch && matchesType && matchesLocation;
    });
  }, [jobs, searchTerm, typeFilter, locationFilter]);

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-primary/5 py-16 md:py-24 border-b border-primary/10">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
            Find Your <span className="text-primary relative inline-block">Dream Job
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0,5 Q50,10 100,5" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            The trusted career partner for Marathi-speaking professionals. Connecting local talent with top IT and Non-IT opportunities.
          </p>
          
          {/* Stats */}
          {!isLoadingStats && stats && (
            <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto mb-12 bg-background p-6 rounded-2xl shadow-sm border">
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-primary">{stats.total}</span>
                <span className="text-sm text-muted-foreground font-medium">Total Jobs</span>
              </div>
              <div className="flex flex-col items-center border-l border-r">
                <span className="text-3xl font-bold text-secondary">{stats.itJobs}</span>
                <span className="text-sm text-muted-foreground font-medium">IT Jobs</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-accent-foreground">{stats.nonItJobs}</span>
                <span className="text-sm text-muted-foreground font-medium">Non-IT Jobs</span>
              </div>
            </div>
          )}

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Job title, company, or keywords" 
                className="pl-10 h-12 text-base rounded-xl"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <Select value={typeFilter} onValueChange={(v: any) => setTypeFilter(v)}>
                <SelectTrigger className="h-12 w-[140px] rounded-xl bg-background">
                  <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="IT">IT</SelectItem>
                  <SelectItem value="Non-IT">Non-IT</SelectItem>
                </SelectContent>
              </Select>

              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="h-12 w-[160px] rounded-xl bg-background">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {stats?.locations.map(loc => (
                    <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Jobs Grid */}
      <main className="flex-1 container mx-auto px-4 md:px-8 py-12">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Latest Opportunities</h2>
            <p className="text-muted-foreground">Showing {filteredJobs.length} jobs</p>
          </div>
        </div>

        {isLoadingJobs ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <Card key={i} className="h-[280px] animate-pulse">
                <CardHeader className="space-y-4">
                  <div className="h-6 bg-muted rounded w-2/3"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="h-4 bg-muted rounded w-full"></div>
                  <div className="h-4 bg-muted rounded w-4/5"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-20 bg-background rounded-2xl border border-dashed">
            <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters to find what you're looking for.</p>
            <Button 
              variant="outline" 
              className="mt-6"
              onClick={() => {
                setSearchTerm("");
                setTypeFilter("all");
                setLocationFilter("all");
              }}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="flex flex-col hover-elevate hover:border-primary/50 transition-colors">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant={job.type === "IT" ? "default" : "secondary"} className="mb-2">
                      {job.type}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(job.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg line-clamp-1" title={job.title}>{job.title}</h3>
                  <div className="flex items-center text-muted-foreground mt-1">
                    <Building2 className="h-4 w-4 mr-1.5" />
                    <span className="text-sm font-medium">{job.company}</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 pb-4">
                  <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1.5 flex-shrink-0 text-primary/70" />
                      <span className="truncate" title={job.location}>{job.location}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <IndianRupee className="h-4 w-4 mr-1.5 flex-shrink-0 text-primary/70" />
                      <span className="truncate">
                        {job.salaryMin && job.salaryMax 
                          ? `${(job.salaryMin/1000).toFixed(0)}k - ${(job.salaryMax/1000).toFixed(0)}k` 
                          : job.salaryMin 
                            ? `${(job.salaryMin/1000).toFixed(0)}k+` 
                            : "Not disclosed"}
                      </span>
                    </div>
                    <div className="flex items-center text-muted-foreground col-span-2">
                      <Briefcase className="h-4 w-4 mr-1.5 flex-shrink-0 text-primary/70" />
                      <span className="truncate">Exp: {job.experience}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0 border-t mt-auto px-6 py-4 bg-muted/10 rounded-b-xl">
                  <Link href={`/apply/${job.id}`} className="w-full">
                    <Button className="w-full rounded-lg font-semibold" variant="default">
                      Apply Now
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
