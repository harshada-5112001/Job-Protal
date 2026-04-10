import { Router, type IRouter } from "express";
import { eq, and, sql } from "drizzle-orm";
import { db, jobsTable, applicationsTable, contactMessagesTable } from "@workspace/db";
import {
  AdminLoginBody,
  AdminCreateJobBody,
  AdminUpdateJobBody,
  AdminUpdateJobParams,
  AdminDeleteJobParams,
  AdminListApplicationsQueryParams,
  AdminUpdateApplicationStatusParams,
  AdminUpdateApplicationStatusBody,
  AdminGetStatsResponse,
} from "@workspace/api-zod";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME ?? "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "samaj@2024";
const ADMIN_TOKEN = "simple-samaj-admin-secret-token";

const router: IRouter = Router();

function serializeDates(obj: Record<string, unknown>) {
  const result: Record<string, unknown> = {};
  for (const key of Object.keys(obj)) {
    result[key] = obj[key] instanceof Date ? (obj[key] as Date).toISOString() : obj[key];
  }
  return result;
}

function requireAdmin(req: import("express").Request, res: import("express").Response, next: import("express").NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const token = authHeader.split(" ")[1];
  if (token !== ADMIN_TOKEN) {
    res.status(401).json({ error: "Invalid token" });
    return;
  }
  next();
}

router.post("/admin/login", async (req, res): Promise<void> => {
  const parsed = AdminLoginBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { username, password } = parsed.data;
  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  res.json({ token: ADMIN_TOKEN, username });
});

router.get("/admin/jobs", requireAdmin, async (_req, res): Promise<void> => {
  const jobs = await db.select().from(jobsTable).orderBy(sql`${jobsTable.createdAt} desc`);
  res.json(jobs.map((j) => serializeDates(j as unknown as Record<string, unknown>)));
});

router.post("/admin/jobs", requireAdmin, async (req, res): Promise<void> => {
  const parsed = AdminCreateJobBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [job] = await db.insert(jobsTable).values({
    ...parsed.data,
    isActive: parsed.data.isActive ?? true,
  }).returning();

  res.status(201).json(serializeDates(job as unknown as Record<string, unknown>));
});

router.put("/admin/jobs/:id", requireAdmin, async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = AdminUpdateJobParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const parsed = AdminUpdateJobBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [job] = await db
    .update(jobsTable)
    .set(parsed.data)
    .where(eq(jobsTable.id, params.data.id))
    .returning();

  if (!job) {
    res.status(404).json({ error: "Job not found" });
    return;
  }

  res.json(serializeDates(job as unknown as Record<string, unknown>));
});

router.delete("/admin/jobs/:id", requireAdmin, async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = AdminDeleteJobParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [job] = await db.delete(jobsTable).where(eq(jobsTable.id, params.data.id)).returning();

  if (!job) {
    res.status(404).json({ error: "Job not found" });
    return;
  }

  res.sendStatus(204);
});

router.get("/admin/applications", requireAdmin, async (req, res): Promise<void> => {
  const parsed = AdminListApplicationsQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { jobId, status } = parsed.data;
  const conditions = [];

  if (jobId != null) {
    conditions.push(eq(applicationsTable.jobId, jobId));
  }
  if (status) {
    conditions.push(eq(applicationsTable.status, status));
  }

  const applications = await db
    .select({
      id: applicationsTable.id,
      jobId: applicationsTable.jobId,
      fullName: applicationsTable.fullName,
      mobileNumber: applicationsTable.mobileNumber,
      email: applicationsTable.email,
      location: applicationsTable.location,
      experience: applicationsTable.experience,
      skills: applicationsTable.skills,
      resumeUrl: applicationsTable.resumeUrl,
      status: applicationsTable.status,
      createdAt: applicationsTable.createdAt,
      jobTitle: jobsTable.title,
      jobCompany: jobsTable.company,
    })
    .from(applicationsTable)
    .leftJoin(jobsTable, eq(applicationsTable.jobId, jobsTable.id))
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(sql`${applicationsTable.createdAt} desc`);

  res.json(applications.map((a) => serializeDates(a as unknown as Record<string, unknown>)));
});

router.put("/admin/applications/:id/status", requireAdmin, async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = AdminUpdateApplicationStatusParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const parsed = AdminUpdateApplicationStatusBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [application] = await db
    .update(applicationsTable)
    .set({ status: parsed.data.status })
    .where(eq(applicationsTable.id, params.data.id))
    .returning();

  if (!application) {
    res.status(404).json({ error: "Application not found" });
    return;
  }

  res.json(serializeDates(application as unknown as Record<string, unknown>));
});

router.get("/admin/contact-messages", requireAdmin, async (_req, res): Promise<void> => {
  const messages = await db
    .select()
    .from(contactMessagesTable)
    .orderBy(sql`${contactMessagesTable.createdAt} desc`);

  res.json(messages.map((message) => serializeDates(message as unknown as Record<string, unknown>)));
});

router.put("/admin/contact-messages/:id/read", requireAdmin, async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  if (Number.isNaN(id)) {
    res.status(400).json({ error: "Invalid message ID" });
    return;
  }

  const [message] = await db
    .update(contactMessagesTable)
    .set({ status: "read" })
    .where(eq(contactMessagesTable.id, id))
    .returning();

  if (!message) {
    res.status(404).json({ error: "Message not found" });
    return;
  }

  res.json(serializeDates(message as unknown as Record<string, unknown>));
});

router.get("/admin/stats", requireAdmin, async (_req, res): Promise<void> => {
  const [jobStats] = await db.select({
    totalJobs: sql<number>`count(*)::int`,
    activeJobs: sql<number>`count(*) filter (where ${jobsTable.isActive} = true)::int`,
  }).from(jobsTable);

  const [appStats] = await db.select({
    totalApplications: sql<number>`count(*)::int`,
    pendingApplications: sql<number>`count(*) filter (where ${applicationsTable.status} = 'pending')::int`,
    selectedApplications: sql<number>`count(*) filter (where ${applicationsTable.status} = 'selected')::int`,
    rejectedApplications: sql<number>`count(*) filter (where ${applicationsTable.status} = 'rejected')::int`,
    calledApplications: sql<number>`count(*) filter (where ${applicationsTable.status} = 'called')::int`,
  }).from(applicationsTable);

  res.json(AdminGetStatsResponse.parse({
    totalJobs: jobStats?.totalJobs ?? 0,
    activeJobs: jobStats?.activeJobs ?? 0,
    totalApplications: appStats?.totalApplications ?? 0,
    pendingApplications: appStats?.pendingApplications ?? 0,
    selectedApplications: appStats?.selectedApplications ?? 0,
    rejectedApplications: appStats?.rejectedApplications ?? 0,
    calledApplications: appStats?.calledApplications ?? 0,
  }));
});

export default router;
