import { db, applicationsTable, jobsTable } from "@workspace/db";

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
  {
    fullName: "Amit Reddy",
    mobileNumber: "9234567801",
    email: "amit.reddy@example.com",
    location: "Delhi",
    experience: "4 years",
    skills: "Sales, CRM, Client Management",
    resumeUrl: "/resumes/amit-reddy.pdf",
    status: "pending",
  },
  {
    fullName: "Pooja Singh",
    mobileNumber: "9101122334",
    email: "pooja.singh@example.com",
    location: "Ahmedabad",
    experience: "2 years",
    skills: "Content Writing, SEO, Blogging",
    resumeUrl: "/resumes/pooja-singh.pdf",
    status: "pending",
  },
  {
    fullName: "Neeraj Kulkarni",
    mobileNumber: "9887766554",
    email: "neeraj.kulkarni@example.com",
    location: "Bangalore",
    experience: "6 years",
    skills: "Full Stack Development, React, Node.js",
    resumeUrl: "/resumes/neeraj-kulkarni.pdf",
    status: "called",
  },
  {
    fullName: "Shruti Patil",
    mobileNumber: "9765432109",
    email: "shruti.patil@example.com",
    location: "Pune",
    experience: "1 year",
    skills: "QA Testing, Selenium, Cypress",
    resumeUrl: "/resumes/shruti-patil.pdf",
    status: "pending",
  },
  {
    fullName: "Rohan Desai",
    mobileNumber: "9054321678",
    email: "rohan.desai@example.com",
    location: "Mumbai",
    experience: "3 years",
    skills: "Marketing, Social Media, Content Strategy",
    resumeUrl: "/resumes/rohan-desai.pdf",
    status: "selected",
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

    console.log("Adding 10 dummy applications...");
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
