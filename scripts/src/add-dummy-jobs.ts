import { db, jobsTable } from "@workspace/db";

const dummyJobs = [
  {
    title: "Senior React Developer",
    company: "TechCorp India",
    type: "IT" as const,
    location: "Bangalore",
    salaryMin: 800000,
    salaryMax: 1200000,
    experience: "5+ years",
    description: "Looking for experienced React developer with strong TypeScript skills and experience with modern web technologies.",
    isActive: true,
  },
  {
    title: "Python Backend Engineer",
    company: "CloudSoft Solutions",
    type: "IT" as const,
    location: "Pune",
    salaryMin: 700000,
    salaryMax: 1000000,
    experience: "3-5 years",
    description: "Build scalable backend services using Python, Django, and PostgreSQL. Experience with microservices required.",
    isActive: true,
  },
  {
    title: "Data Analyst",
    company: "Analytics Hub",
    type: "IT" as const,
    location: "Mumbai",
    salaryMin: 500000,
    salaryMax: 800000,
    experience: "2-3 years",
    description: "Analyze large datasets and create insightful reports. Experience with SQL, Python, and Power BI preferred.",
    isActive: true,
  },
  {
    title: "DevOps Engineer",
    company: "CloudInfra Inc",
    type: "IT" as const,
    location: "Hyderabad",
    salaryMin: 750000,
    salaryMax: 1100000,
    experience: "4+ years",
    description: "Manage cloud infrastructure, CI/CD pipelines, and containerization. AWS or Azure experience required.",
    isActive: true,
  },
  {
    title: "Sales Executive",
    company: "Global Trade Solutions",
    type: "Non-IT" as const,
    location: "Delhi",
    salaryMin: 400000,
    salaryMax: 600000,
    experience: "2-4 years",
    description: "Sell enterprise software solutions to B2B clients. Strong communication and negotiation skills required.",
    isActive: true,
  },
  {
    title: "HR Manager",
    company: "People First Corp",
    type: "Non-IT" as const,
    location: "Bangalore",
    salaryMin: 600000,
    salaryMax: 900000,
    experience: "5+ years",
    description: "Manage recruitment, employee relations, and company culture. Experience with HRIS systems required.",
    isActive: true,
  },
  {
    title: "Frontend Developer",
    company: "WebFlow Studios",
    type: "IT" as const,
    location: "Pune",
    salaryMin: 600000,
    salaryMax: 900000,
    experience: "2-3 years",
    description: "Create beautiful and responsive UI using React, Vue, or Angular. Figma design collaboration skills needed.",
    isActive: true,
  },
  {
    title: "Quality Assurance Tester",
    company: "QA Masters",
    type: "IT" as const,
    location: "Chennai",
    salaryMin: 400000,
    salaryMax: 600000,
    experience: "2+ years",
    description: "Test software applications and create test cases. Experience with Selenium and TestNG required.",
    isActive: true,
  },
  {
    title: "Content Writer",
    company: "Digital Creative Agency",
    type: "Non-IT" as const,
    location: "Mumbai",
    salaryMin: 350000,
    salaryMax: 500000,
    experience: "1-2 years",
    description: "Write engaging content for web, blogs, and social media. SEO knowledge preferred.",
    isActive: true,
  },
  {
    title: "Full Stack Developer",
    company: "StartupHub",
    type: "IT" as const,
    location: "Bangalore",
    salaryMin: 700000,
    salaryMax: 1000000,
    experience: "3+ years",
    description: "Build end-to-end web applications using modern tech stack. Experience with Node.js, React, and databases required.",
    isActive: true,
  },
];

async function addDummyJobs() {
  try {
    console.log("Adding 10 dummy jobs...");
    
    const inserted = await db.insert(jobsTable).values(dummyJobs).returning();
    
    console.log(`✅ Successfully added ${inserted.length} jobs!`);
    inserted.forEach((job, index) => {
      console.log(`${index + 1}. ${job.title} at ${job.company} (${job.type})`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error adding jobs:", error);
    process.exit(1);
  }
}

addDummyJobs();
