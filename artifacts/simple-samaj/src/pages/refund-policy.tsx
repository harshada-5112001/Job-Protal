import { useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function RefundPolicy() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-16 md:px-8 md:py-20">
        <div className="max-w-4xl mx-auto space-y-10">
          <section className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-foreground">Refund Policy</h1>
            <p className="text-base leading-8 text-muted-foreground">
              Simple Samaj is designed to provide free and premium services to job seekers and recruiters. This policy describes refund eligibility and the process for any paid offerings.
            </p>
          </section>

          <section className="space-y-4 rounded-3xl border border-border/70 bg-background p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-foreground">Scope of Refunds</h2>
            <p className="text-muted-foreground leading-7">
              Our platform primarily offers free access to job listings and resume tools. Refunds only apply to paid subscriptions, premium resume services, or other paid products explicitly listed with a cost.
            </p>
          </section>

          <section className="space-y-4 rounded-3xl border border-border/70 bg-background p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-foreground">Refund Eligibility</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-7">
              <li>Requests must be made within 7 days of purchase unless otherwise stated.</li>
              <li>Services must not have been fully delivered or completed.</li>
              <li>Requests should include valid payment details and order confirmation.</li>
            </ul>
          </section>

          <section className="space-y-4 rounded-3xl border border-border/70 bg-background p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-foreground">Refund Process</h2>
            <p className="text-muted-foreground leading-7">
              To request a refund, contact our support team at <strong>support@simplesamaj.in</strong> with the following details:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-7">
              <li>Purchase date and amount.</li>
              <li>Service or product purchased.</li>
              <li>Reason for the refund request.</li>
            </ul>
            <p className="text-muted-foreground leading-7">
              We will review your case and provide a response within 7 business days. Approved refunds are processed to the original payment method.
            </p>
          </section>

          <section className="space-y-4 rounded-3xl border border-border/70 bg-background p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-foreground">Exceptions and Limitations</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-7">
              <li>Promotional offers, discounts, or introductory pricing may be non-refundable.</li>
              <li>Processing fees charged by payment providers may not be returned.</li>
              <li>Third-party services purchased through our platform are subject to the provider's refund policies.</li>
            </ul>
          </section>

          <section className="space-y-4 rounded-3xl border border-border/70 bg-background p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-foreground">Contact and Support</h2>
            <p className="text-muted-foreground leading-7">
              If you have questions about our refund policy or need assistance with a claim, email our support team at <strong>support@simplesamaj.in</strong>. We are committed to resolving refund requests fairly and transparently.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
