import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { useMemo } from "react";

const getApiBaseUrl = () =>
  import.meta.env.VITE_API_BASE_URL ??
  (import.meta.env.DEV ? "http://localhost:8080" : "");

type ContactMessage = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
  status: "new" | "read" | string;
  createdAt: string;
  updatedAt: string;
};

const fetchContactMessages = async (): Promise<ContactMessage[]> => {
  const token = localStorage.getItem("admin_token");
  const res = await fetch(`${getApiBaseUrl()}/api/admin/contact-messages`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok) {
    throw new Error(`Unable to load messages: ${res.statusText}`);
  }
  return res.json();
};

const markMessageRead = async (id: number): Promise<ContactMessage> => {
  const token = localStorage.getItem("admin_token");
  const res = await fetch(`${getApiBaseUrl()}/api/admin/contact-messages/${id}/read`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok) {
    throw new Error(`Unable to mark message read: ${res.statusText}`);
  }
  return res.json();
};

export default function AdminMessages() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: messages = [], isLoading } = useQuery<ContactMessage[]>({
    queryKey: ["admin-contact-messages"],
    queryFn: fetchContactMessages,
    refetchOnWindowFocus: false,
  });

  const mutation = useMutation({
    mutationFn: markMessageRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-contact-messages"] });
      toast({ title: "Message marked read" });
    },
    onError: () => {
      toast({ title: "Unable to update message", variant: "destructive" });
    },
  });

  const unreadCount = useMemo(
    () => messages.filter((message: any) => message.status === "new").length,
    [messages],
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Contact Messages</h1>
            <p className="text-muted-foreground">Review inquiries sent through the Contact Us page.</p>
          </div>
          <div className="rounded-2xl border border-slate-200/70 bg-white/90 px-4 py-3 shadow-sm">
            <div className="text-sm text-muted-foreground">Unread messages</div>
            <div className="mt-1 text-2xl font-semibold">{unreadCount}</div>
          </div>
        </div>

        <div className="bg-background rounded-xl border shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sender</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Received</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">Loading messages...</TableCell>
                </TableRow>
              ) : messages.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No contact messages yet.</TableCell>
                </TableRow>
              ) : (
                messages.map((message: any) => (
                  <TableRow key={message.id} className="border-b last:border-0">
                    <TableCell>
                      <div className="font-medium">{message.firstName} {message.lastName}</div>
                      <div className="text-xs text-muted-foreground">{message.email}</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{message.subject}</div>
                      <div className="text-xs text-muted-foreground line-clamp-2">{message.message}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={message.status === "new" ? "secondary" : "default"}>
                        {message.status === "new" ? "New" : "Read"}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(message.createdAt).toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={message.status !== "new" || mutation.status === "pending"}
                        onClick={() => mutation.mutate(message.id)}
                      >
                        Mark Read
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
}
