import { Router, type IRouter } from "express";
import { eq, and, gte, lte, sql } from "drizzle-orm";
import { db, jobsTable } from "@workspace/db";
import {
  ListJobsQueryParams,
  GetJobParams,
  GetJobResponse,
  ListJobsResponse,
  GetJobStatsResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

function serializeJob(job: Record<string, unknown>) {
  return {
    ...job,
    createdAt: job.createdAt instanceof Date ? job.createdAt.toISOString() : job.createdAt,
  };
}

router.get("/jobs/stats", async (req, res): Promise<void> => {
  const allJobs = await db.select().from(jobsTable).where(eq(jobsTable.isActive, true));

  const total = allJobs.length;
  const itJobs = allJobs.filter((j) => j.type === "IT").length;
  const nonItJobs = allJobs.filter((j) => j.type === "Non-IT").length;
  const locations = [...new Set(allJobs.map((j) => j.location))];

  res.json(GetJobStatsResponse.parse({ total, itJobs, nonItJobs, locations }));
});

router.get("/jobs", async (req, res): Promise<void> => {
  const parsed = ListJobsQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { type, location, minSalary, maxSalary, experience } = parsed.data;

  const conditions = [eq(jobsTable.isActive, true)];

  if (type && type !== "all") {
    conditions.push(eq(jobsTable.type, type));
  }
  if (location) {
    conditions.push(eq(jobsTable.location, location));
  }
  if (minSalary != null) {
    conditions.push(gte(jobsTable.salaryMin, minSalary));
  }
  if (maxSalary != null) {
    conditions.push(lte(jobsTable.salaryMax, maxSalary));
  }
  if (experience) {
    conditions.push(eq(jobsTable.experience, experience));
  }

  const jobs = await db
    .select()
    .from(jobsTable)
    .where(and(...conditions))
    .orderBy(sql`${jobsTable.createdAt} desc`);

  res.json(ListJobsResponse.parse(jobs.map(serializeJob)));
});

router.get("/jobs/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = GetJobParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [job] = await db.select().from(jobsTable).where(eq(jobsTable.id, params.data.id));

  if (!job) {
    res.status(404).json({ error: "Job not found" });
    return;
  }

  res.json(GetJobResponse.parse(serializeJob(job as Record<string, unknown>)));
});

export default router;
