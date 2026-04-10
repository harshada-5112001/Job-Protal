import { useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-16 md:px-8 md:py-20">
        <div className="max-w-4xl mx-auto space-y-10">
          <section className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-foreground">Privacy Policy</h1>
            <p className="text-base leading-8 text-muted-foreground">
              At Simple Samaj, your privacy is a top priority. This policy explains how we collect, use, store, and protect the personal information you share while using our platform.
            </p>
          </section>

          <section className="space-y-4 rounded-3xl border border-border/70 bg-background p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-foreground">What Information We Collect</h2>
            <p className="text-muted-foreground leading-7">
              We collect information that helps us deliver a better job search experience. This includes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-7">
              <li>Personal details such as your name, email address, phone number, and location.</li>
              <li>Professional information including experience, skills, job preferences, and resume content.</li>
              <li>Usage data such as pages visited, search filters used, and interactions with job postings.</li>
              <li>Technical data including your device type, browser, IP address, and session duration.</li>
            </ul>
          </section>

          <section className="space-y-4 rounded-3xl border border-border/70 bg-background p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-foreground">Why We Use Your Information</h2>
            <p className="text-muted-foreground leading-7">
              We use your data to power the core services of Simple Samaj and improve your experience:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-7">
              <li>To display relevant job listings and match your profile to employer requirements.</li>
              <li>To process and submit applications to employers you choose.</li>
              <li>To communicate important account notifications, application updates, and service improvements.</li>
              <li>To analyze platform usage and improve usability, functionality, and security.</li>
            </ul>
          </section>

          <section className="space-y-4 rounded-3xl border border-border/70 bg-background p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-foreground">How We Share Your Information</h2>
            <p className="text-muted-foreground leading-7">
              We only share your information in the following circumstances:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-7">
              <li>With employers when you submit a job application or explicitly consent to share your profile.</li>
              <li>With trusted service providers who support our operations, such as hosting, analytics, and email delivery.</li>
              <li>When required by law or to respond to legal requests from government authorities.</li>
              <li>To protect the safety, rights, or property of Simple Samaj, our users, or the public.</li>
            </ul>
          </section>

          <section className="space-y-4 rounded-3xl border border-border/70 bg-background p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-foreground">Data Retention and Security</h2>
            <p className="text-muted-foreground leading-7">
              We retain your personal information for as long as needed to provide services and comply with legal obligations. We use industry-standard security measures including encryption, access controls, and regular monitoring to protect your data from unauthorized access and loss.
            </p>
          </section>

          <section className="space-y-4 rounded-3xl border border-border/70 bg-background p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-foreground">Your Privacy Choices</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-7">
              <li>You can update or correct your account information at any time.</li>
              <li>You can request deletion of your account and personal data by contacting our support team.</li>
              <li>You can opt out of marketing communications while still receiving essential account notifications.</li>
            </ul>
            <p className="text-muted-foreground leading-7">
              To exercise these rights, please contact us at <strong>support@simplesamaj.in</strong>. We will respond as soon as possible.
            </p>
          </section>

          <section className="space-y-4 rounded-3xl border border-border/70 bg-background p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-foreground">Children's Privacy</h2>
            <p className="text-muted-foreground leading-7">
              Simple Samaj is not intended for children under the age of 18. We do not knowingly collect personal information from minors without parental consent.
            </p>
          </section>

          <section className="space-y-4 rounded-3xl border border-border/70 bg-background p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-foreground">Policy Updates</h2>
            <p className="text-muted-foreground leading-7">
              We may update this Privacy Policy to reflect changes in our services or legal requirements. We will post the revised policy on this page and update the effective date as needed.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
