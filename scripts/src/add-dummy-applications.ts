import { applicationsTable, db, jobsTable } from "@workspace/db";

type DummyApplication = {
  fullName: string;
  mobileNumber: string;
  email: string;
  location: string;
  experience: string;
  skills: string;
  resumeUrl: string;
  status: string;
};

const dummyApplications: DummyApplication[] = [
  {
    fullName: "Asha Kulkarni",
    mobileNumber: "9876543210",
    email: "asha.kulkarni@example.com",
    location: "Pune",
    experience: "3 years",
    skills: "React, TypeScript, HTML, CSS",
    resumeUrl: "/resumes/asha-kulkarni.pdf",
    status: "pending",
  },
  {
    fullName: "Rahul Patil",
    mobileNumber: "9123456780",
    email: "rahul.patil@example.com",
    location: "Mumbai",
    experience: "4 years",
    skills: "Node.js, Express, PostgreSQL",
    resumeUrl: "/resumes/rahul-patil.pdf",
    status: "called",
  },
  {
    fullName: "Sneha Deshmukh",
    mobileNumber: "9988776655",
    email: "sneha.deshmukh@example.com",
    location: "Bangalore",
    experience: "2 years",
    skills: "Python, Django, SQL",
    resumeUrl: "/resumes/sneha-deshmukh.pdf",
    status: "pending",
  },
  {
    fullName: "Vivek Joshi",
    mobileNumber: "9012345678",
    email: "vivek.joshi@example.com",
    location: "Hyderabad",
    experience: "5 years",
    skills: "AWS, Docker, Kubernetes",
    resumeUrl: "/resumes/vivek-joshi.pdf",
    status: "selected",
  },
  {
    fullName: "Mrunal Shinde",
    mobileNumber: "9876501234",
    email: "mrunal.shinde@example.com",
    location: "Chennai",
    experience: "3 years",
    skills: "UI/UX, Figma, React",
    resumeUrl: "/resumes/mrunal-shinde.pdf",
    status: "rejected",
  },
];

async function addDummyApplications() {
  try {
    const jobs = await db.select().from(jobsTable).orderBy(jobsTable.id);
    if (jobs.length === 0) {
      throw new Error("No jobs found in the database. Please add jobs before inserting applications.");
    }

    const jobIds = jobs.map((job) => job.id);
    const applications = dummyApplications.map((application, index) => ({
      ...application,
      jobId: jobIds[index % jobIds.length],
    }));

    console.log("Adding 5 dummy applications...");
    const inserted = await db.insert(applicationsTable).values(applications).returning();

    console.log(`✅ Successfully added ${inserted.length} applications!`);
    inserted.forEach((application, index) => {
      console.log(`${index + 1}. ${application.fullName} -> jobId ${application.jobId} (${application.status})`);
    });
    process.exit(0);
  } catch (error) {
    console.error("❌ Error adding applications:", error);
    process.exit(1);
  }
}

addDummyApplications();
