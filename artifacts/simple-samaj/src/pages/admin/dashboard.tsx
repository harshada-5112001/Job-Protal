import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminGetStats, useAdminListApplications } from "@workspace/api-client-react";
import { Users, Briefcase, CheckCircle2, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export default function AdminDashboard() {
  const { data: stats, isLoading: isStatsLoading } = useAdminGetStats();
  const { data: applications = [], isLoading: isAppsLoading } = useAdminListApplications();

  const recentApplications = applications.slice(0, 5);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
        </div>

        {/* Stats Row */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
              <Briefcase className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isStatsLoading ? <Skeleton className="h-7 w-16" /> : (
                <div className="text-2xl font-bold">{stats?.totalJobs || 0}</div>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                {isStatsLoading ? <Skeleton className="h-3 w-24 mt-1" /> : `${stats?.activeJobs || 0} currently active`}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <Users className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isStatsLoading ? <Skeleton className="h-7 w-16" /> : (
                <div className="text-2xl font-bold">{stats?.totalApplications || 0}</div>
              )}
              <p className="text-xs text-muted-foreground mt-1">Across all jobs</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
              <Clock className="w-4 h-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              {isStatsLoading ? <Skeleton className="h-7 w-16" /> : (
                <div className="text-2xl font-bold">{stats?.pendingApplications || 0}</div>
              )}
              <p className="text-xs text-muted-foreground mt-1">Needs attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Selected</CardTitle>
              <CheckCircle2 className="w-4 h-4 text-green-500" />
            </CardHeader>
            <CardContent>
              {isStatsLoading ? <Skeleton className="h-7 w-16" /> : (
                <div className="text-2xl font-bold">{stats?.selectedApplications || 0}</div>
              )}
              <p className="text-xs text-muted-foreground mt-1">Successful hires</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Applications */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
          </CardHeader>
          <CardContent>
            {isAppsLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => <Skeleton key={i} className="h-12 w-full" />)}
              </div>
            ) : recentApplications.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No applications received yet.
              </div>
            ) : (
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Applicant</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Job</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Date</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {recentApplications.map(app => (
                      <tr key={app.id} className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-4 align-middle">
                          <div className="font-medium">{app.fullName}</div>
                          <div className="text-xs text-muted-foreground">{app.mobileNumber}</div>
                        </td>
                        <td className="p-4 align-middle">{app.jobTitle || 'General Application'}</td>
                        <td className="p-4 align-middle">
                          {new Date(app.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-4 align-middle">
                          <Badge variant={
                            app.status === 'pending' ? 'secondary' :
                            app.status === 'called' ? 'default' :
                            app.status === 'selected' ? 'outline' : 'destructive'
                          }>
                            {app.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
