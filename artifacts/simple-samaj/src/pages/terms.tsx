import { useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function TermsAndConditions() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-16 md:px-8 md:py-20">
        <div className="max-w-4xl mx-auto space-y-10">
          <section className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-foreground">Terms & Conditions</h1>
            <p className="text-base leading-8 text-muted-foreground">
              These terms govern your use of Simple Samaj. By accessing or using our platform, you agree to these conditions and all related policies.
            </p>
          </section>

          <section className="space-y-4 rounded-3xl border border-border/70 bg-background p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-foreground">Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-7">
              When you use Simple Samaj, you accept these terms in full. If you disagree with any part of this policy, please do not use our services.
            </p>
          </section>

          <section className="space-y-4 rounded-3xl border border-border/70 bg-background p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-foreground">Definitions</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-7">
              <li><strong>Platform:</strong> The Simple Samaj website and related services.</li>
              <li><strong>User:</strong> Any person who accesses or uses the platform.</li>
              <li><strong>Employer:</strong> A company or recruiter posting job opportunities on the platform.</li>
              <li><strong>Personal Data:</strong> Any information that can identify you directly or indirectly.</li>
            </ul>
          </section>

          <section className="space-y-4 rounded-3xl border border-border/70 bg-background p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-foreground">Platform Use</h2>
            <p className="text-muted-foreground leading-7">
              You may use Simple Samaj to explore job opportunities, submit applications, and create a resume. You agree not to use the platform for unlawful activity, harassment, or any behavior that interferes with others.
            </p>
          </section>

          <section className="space-y-4 rounded-3xl border border-border/70 bg-background p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-foreground">Account Responsibilities</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-7">
              <li>Keep your account information accurate, complete, and up to date.</li>
              <li>Protect your login information and notify us immediately if you suspect unauthorized access.</li>
              <li>Be responsible for all activity under your account.</li>
            </ul>
          </section>

          <section className="space-y-4 rounded-3xl border border-border/70 bg-background p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-foreground">Intellectual Property</h2>
            <p className="text-muted-foreground leading-7">
              All content on Simple Samaj, including text, graphics, logos, and software, is owned by or licensed to us. You may not reproduce, distribute, or modify content without prior written permission.
            </p>
          </section>

          <section className="space-y-4 rounded-3xl border border-border/70 bg-background p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-foreground">Limitation of Liability</h2>
            <p className="text-muted-foreground leading-7">
              Simple Samaj is a facilitator connecting job seekers and employers. We are not responsible for the outcome of job applications, employer hiring decisions, or the accuracy of third-party content.
            </p>
          </section>

          <section className="space-y-4 rounded-3xl border border-border/70 bg-background p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-foreground">Termination</h2>
            <p className="text-muted-foreground leading-7">
              We may suspend or terminate your access if you violate these terms, use the platform abusively, or otherwise harm the service or other users.
            </p>
          </section>

          <section className="space-y-4 rounded-3xl border border-border/70 bg-background p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-foreground">Changes to Terms</h2>
            <p className="text-muted-foreground leading-7">
              We may update these terms as our platform evolves. We will post any changes on this page and, when appropriate, notify you through the platform or email.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
