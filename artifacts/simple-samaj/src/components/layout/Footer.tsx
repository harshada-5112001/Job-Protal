import { Link } from "wouter";
import { Briefcase, Mail, Phone, Instagram, Linkedin, Facebook } from "lucide-react";

const NAV_LINKS = [
  { label: "Browse All Jobs", href: "/#jobs" },
  { label: "IT Jobs", href: "/?type=IT#jobs" },
  { label: "Non-IT Jobs", href: "/?type=Non-IT#jobs" },
  { label: "Apply General", href: "/apply" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Refund Policy", href: "/refund-policy" },
];

const COMPANY_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Careers", href: "/careers" },
];

export function Footer() {
  const scrollToJobsSection = () => {
    const jobsSection = document.getElementById("jobs");
    if (jobsSection) {
      window.requestAnimationFrame(() => {
        jobsSection.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="no-print" style={{ background: "linear-gradient(180deg, #0d1b2a 0%, #0a1520 100%)" }}>

      <div className="overflow-hidden leading-none" style={{ marginTop: "-2px" }}>
        <svg viewBox="0 0 1440 40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
          style={{ display: "block", width: "100%", height: "40px" }}>
          <path d="M0,26.67 C240,0 480,40 720,20 C960,0 1200,33.33 1440,13.33 L1440,0 L0,0 Z"
            fill="hsl(40, 33%, 98%)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          <div className="space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl text-white shadow-lg"
                style={{ background: "linear-gradient(135deg, #ff6a2f, #ff9500)" }}>
                <Briefcase className="h-5 w-5" />
              </div>
              <span className="text-white text-xl font-black tracking-tight">
                Simple<span style={{ color: "#ff6a2f" }}>Samaj</span>
              </span>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              The trusted career partner for professionals.
              Connecting local talent with top IT and Non-IT opportunities across Maharashtra.
            </p>

            <div className="flex flex-col gap-4 pt-1 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-2.5">
                <a href="mailto:support@simplesamaj.in"
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all group"
                  style={{ background: "rgba(255,106,47,0.08)", border: "1px solid rgba(255,106,47,0.15)" }}>
                  <div className="flex items-center justify-center w-7 h-7 rounded-lg"
                    style={{ background: "rgba(255,106,47,0.2)" }}>
                    <Mail className="w-3.5 h-3.5" style={{ color: "#ff6a2f" }} />
                  </div>
                  <span className="text-sm text-gray-300 group-hover:text-white transition-colors">support@simplesamaj.in</span>
                </a>
              </div>

              <div className="flex items-center justify-end gap-2.5">
                {[
                  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
                  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
                ].map(({ icon: Icon, href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    className="flex items-center justify-center w-9 h-9 rounded-xl transition-all"
                    style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,106,47,0.25)";
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,106,47,0.4)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)";
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
                    }}>
                    <Icon className="w-4 h-4 text-gray-400" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <span className="w-6 h-0.5 rounded-full" style={{ background: "#ff6a2f" }} />
              <h3 className="text-white font-bold text-xs uppercase tracking-widest">Job Seekers</h3>
            </div>
            <ul className="space-y-2.5">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href}
                    onClick={() => href.includes("#jobs") && scrollToJobsSection()}
                    className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full flex-shrink-0 transition-all group-hover:w-2"
                      style={{ background: "#ff6a2f", opacity: 0.6 }} />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-0.5 rounded-full" style={{ background: "#ff6a2f" }} />
                <h3 className="text-white font-bold text-xs uppercase tracking-widest">Resume</h3>
              </div>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/resume-builder"
                    onClick={scrollToTop}
                    className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: "#ff6a2f", opacity: 0.6 }} />
                    Resume Builder
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-0.5 rounded-full" style={{ background: "#ff6a2f" }} />
                <h3 className="text-white font-bold text-xs uppercase tracking-widest">Company</h3>
              </div>
              <ul className="space-y-2.5">
                {COMPANY_LINKS.map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href}
                      onClick={scrollToTop}
                      className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                      <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: "#ff6a2f", opacity: 0.6 }} />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <span className="w-6 h-0.5 rounded-full" style={{ background: "#ff6a2f" }} />
              <h3 className="text-white font-bold text-xs uppercase tracking-widest">Legal</h3>
            </div>
            <ul className="space-y-2.5">
              {LEGAL_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href}
                    className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: "#ff6a2f", opacity: 0.6 }} />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="container mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} <span className="font-semibold text-white">Simple</span><span style={{ color: "#ff6a2f" }} className="font-semibold">Samaj</span>. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            Made with <span style={{ color: "#ff6a2f" }}>♥</span> for professionals across Maharashtra
          </p>
        </div>
      </div>

    </footer>
  );
}
