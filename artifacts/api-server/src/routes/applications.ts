import { Router, type IRouter } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { db, applicationsTable } from "@workspace/db";

const router: IRouter = Router();

const uploadDir = "/tmp/resumes";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "resume-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"));
    }
  },
});

router.post("/applications", upload.single("resume"), async (req, res): Promise<void> => {
  const { jobId, fullName, mobileNumber, email, location, experience, skills } = req.body;

  if (!fullName || !mobileNumber || !email || !location || !experience || !skills) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  const resumeUrl = req.file ? `/api/resumes/${req.file.filename}` : null;

  const [application] = await db
    .insert(applicationsTable)
    .values({
      jobId: jobId ? parseInt(jobId, 10) : null,
      fullName,
      mobileNumber,
      email,
      location,
      experience,
      skills,
      resumeUrl,
      status: "pending",
    })
    .returning();

  res.status(201).json(application);
});

router.get("/resumes/:filename", (req, res): void => {
  const raw = Array.isArray(req.params.filename) ? req.params.filename[0] : req.params.filename;
  const safeFilename = path.basename(raw);
  const filePath = path.join(uploadDir, safeFilename);
  if (!fs.existsSync(filePath)) {
    res.status(404).json({ error: "Resume not found" });
    return;
  }
  res.sendFile(filePath);
});

export default router;
