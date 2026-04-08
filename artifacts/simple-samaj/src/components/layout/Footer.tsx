import { Link } from "wouter";
import { Briefcase, Mail, Phone, Instagram, Linkedin, Facebook, ArrowRight, FileText } from "lucide-react";

const NAV_LINKS = [
  { label: "Browse All Jobs", href: "/" },
  { label: "IT Jobs", href: "/?type=IT" },
  { label: "Non-IT Jobs", href: "/?type=Non-IT" },
  { label: "Fresher Jobs", href: "/?experience=fresher" },
  { label: "Work From Home", href: "/?location=Remote" },
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

const CITIES = ["Pune", "Mumbai", "Nagpur", "Nashik", "Aurangabad", "Kolhapur", "Solapur", "Thane", "Navi Mumbai", "Amravati"];

export function Footer() {
  return (
    <footer className="no-print" style={{ background: "linear-gradient(180deg, #0d1b2a 0%, #0a1520 100%)" }}>

      {/* Wave SVG Divider */}
      <div className="overflow-hidden leading-none" style={{ marginTop: "-2px" }}>
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
          style={{ display: "block", width: "100%", height: "60px" }}>
          <path d="M0,40 C240,0 480,60 720,30 C960,0 1200,50 1440,20 L1440,0 L0,0 Z"
            fill="hsl(40, 33%, 98%)" />
        </svg>
      </div>

      {/* CTA Banner */}
      <div className="relative overflow-hidden">
        <div className="container mx-auto px-6 pt-8 pb-12">
          <div
            className="relative rounded-2xl px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden"
            style={{ background: "linear-gradient(135deg, hsl(16,100%,60%) 0%, hsl(24,100%,50%) 50%, hsl(16,100%,45%) 100%)" }}
          >
            {/* decorative circles */}
            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-20"
              style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }} />
            <div className="absolute -bottom-8 left-20 w-32 h-32 rounded-full opacity-10"
              style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }} />

            <div className="relative z-10 text-center md:text-left">
              <p className="text-white/80 text-sm font-medium uppercase tracking-widest mb-1">Your next big move starts here</p>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
                Maharashtra's #1 Job Portal<br className="hidden md:block" /> for Marathi Professionals
              </h2>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Link href="/">
                <button className="flex items-center gap-2 bg-white text-orange-600 font-bold px-6 py-3 rounded-xl hover:bg-orange-50 transition-all shadow-lg text-sm">
                  <Briefcase className="w-4 h-4" /> Browse Jobs <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link href="/resume-builder">
                <button className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/30 transition-all border border-white/30 text-sm">
                  <FileText className="w-4 h-4" /> Build Resume
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Strip */}
      <div className="border-y border-white/5" style={{ background: "rgba(255,255,255,0.03)" }}>
        <div className="container mx-auto px-6 py-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { num: "11+", label: "Live Jobs" },
              { num: "10+", label: "Cities Covered" },
              { num: "3", label: "Resume Templates" },
            ].map(({ num, label }) => (
              <div key={label} className="flex flex-col items-center">
                <span className="text-2xl md:text-3xl font-black"
                  style={{ background: "linear-gradient(135deg, #ff6a2f, #ffab40)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  {num}
                </span>
                <span className="text-xs text-gray-400 font-medium uppercase tracking-wider mt-0.5">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="container mx-auto px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10">

          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-5">
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
              The trusted career partner for Marathi-speaking professionals.
              Connecting local talent with top IT and Non-IT opportunities across Maharashtra.
            </p>

            {/* Contact Cards */}
            <div className="space-y-2.5 pt-1">
              <a href="mailto:support@simplesamaj.in"
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all group"
                style={{ background: "rgba(255,106,47,0.08)", border: "1px solid rgba(255,106,47,0.15)" }}>
                <div className="flex items-center justify-center w-7 h-7 rounded-lg"
                  style={{ background: "rgba(255,106,47,0.2)" }}>
                  <Mail className="w-3.5 h-3.5" style={{ color: "#ff6a2f" }} />
                </div>
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">support@simplesamaj.in</span>
              </a>
              <a href="tel:+919876543210"
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all group"
                style={{ background: "rgba(255,106,47,0.08)", border: "1px solid rgba(255,106,47,0.15)" }}>
                <div className="flex items-center justify-center w-7 h-7 rounded-lg"
                  style={{ background: "rgba(255,106,47,0.2)" }}>
                  <Phone className="w-3.5 h-3.5" style={{ color: "#ff6a2f" }} />
                </div>
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">+91 98765 43210</span>
              </a>
            </div>

            {/* Socials */}
            <div className="flex gap-2.5 pt-1">
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

          {/* Job Seekers */}
          <div className="lg:col-span-3 space-y-5">
            <div className="flex items-center gap-2">
              <span className="w-6 h-0.5 rounded-full" style={{ background: "#ff6a2f" }} />
              <h3 className="text-white font-bold text-xs uppercase tracking-widest">Job Seekers</h3>
            </div>
            <ul className="space-y-2.5">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href}
                    className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full flex-shrink-0 transition-all group-hover:w-2"
                      style={{ background: "#ff6a2f", opacity: 0.6 }} />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resume + Company */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-0.5 rounded-full" style={{ background: "#ff6a2f" }} />
                <h3 className="text-white font-bold text-xs uppercase tracking-widest">Resume</h3>
              </div>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/resume-builder"
                    className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: "#ff6a2f", opacity: 0.6 }} />
                    Resume Builder
                  </Link>
                </li>
                {["Modern Template", "Classic Template", "Minimal Template", "PDF Download"].map(t => (
                  <li key={t} className="text-xs text-gray-600 pl-3">{t}</li>
                ))}
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
                      className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                      <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: "#ff6a2f", opacity: 0.6 }} />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Legal */}
          <div className="lg:col-span-3 space-y-5">
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

            {/* Mini badge */}
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium"
              style={{ background: "rgba(255,106,47,0.1)", border: "1px solid rgba(255,106,47,0.2)", color: "#ff8c5a" }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#ff6a2f" }} />
              Hiring is 100% Free
            </div>
          </div>
        </div>
      </div>

      {/* Cities Marquee Strip */}
      <div className="overflow-hidden border-t border-white/5 py-3" style={{ background: "rgba(255,255,255,0.02)" }}>
        <div className="flex gap-6 text-xs text-gray-600 font-medium uppercase tracking-wider whitespace-nowrap">
          {[...CITIES, ...CITIES].map((city, i) => (
            <span key={i} className="flex items-center gap-6 flex-shrink-0">
              {city}
              <span style={{ color: "#ff6a2f", opacity: 0.5 }}>•</span>
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="container mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} <span className="text-gray-400 font-semibold">SimpleSamaj</span>. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            Made with <span style={{ color: "#ff6a2f" }}>♥</span> for Marathi professionals across Maharashtra
          </p>
        </div>
      </div>

    </footer>
  );
}
