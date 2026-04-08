import { Link } from "wouter";
import { Briefcase, Mail, Phone, Instagram, Linkedin, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[hsl(210,39%,13%)] text-gray-300 no-print">
      <div className="container mx-auto px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* 1. Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
                <Briefcase className="h-4 w-4" />
              </div>
              <span className="text-white text-xl font-bold tracking-tight">
                Simple<span className="text-primary">Samaj</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Find jobs faster. Hire smarter.<br />
              The trusted career partner for Marathi-speaking professionals across Maharashtra.
            </p>
            <div className="flex gap-3 pt-1">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-primary hover:text-white transition-colors text-gray-400"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-primary hover:text-white transition-colors text-gray-400"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-primary hover:text-white transition-colors text-gray-400"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* 2. Job Seekers */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest">Job Seekers</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-400 hover:text-primary transition-colors">Browse All Jobs</Link>
              </li>
              <li>
                <Link href="/?type=IT" className="text-gray-400 hover:text-primary transition-colors">IT Jobs</Link>
              </li>
              <li>
                <Link href="/?type=Non-IT" className="text-gray-400 hover:text-primary transition-colors">Non-IT Jobs</Link>
              </li>
              <li>
                <Link href="/?experience=fresher" className="text-gray-400 hover:text-primary transition-colors">Fresher Jobs</Link>
              </li>
              <li>
                <Link href="/?location=Remote" className="text-gray-400 hover:text-primary transition-colors">Work From Home</Link>
              </li>
              <li>
                <Link href="/apply" className="text-gray-400 hover:text-primary transition-colors">Apply General</Link>
              </li>
            </ul>
          </div>

          {/* 3. Resume Tools */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest">Resume Tools</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/resume-builder" className="text-gray-400 hover:text-primary transition-colors flex items-center gap-1.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary"></span>
                  Resume Builder
                </Link>
              </li>
              <li className="text-gray-500 text-xs pl-3">Modern Template</li>
              <li className="text-gray-500 text-xs pl-3">Classic Template</li>
              <li className="text-gray-500 text-xs pl-3">Minimal Template</li>
              <li className="text-gray-500 text-xs pl-3">PDF Download</li>
            </ul>

            <h3 className="text-white font-semibold text-sm uppercase tracking-widest pt-2">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-primary transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-primary transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-400 hover:text-primary transition-colors">Careers</Link>
              </li>
            </ul>
          </div>

          {/* 4. Contact + Legal */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest">Contact & Support</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-gray-400">
                <Mail className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                <a href="mailto:support@simplesamaj.in" className="hover:text-primary transition-colors break-all">
                  support@simplesamaj.in
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <a href="tel:+919876543210" className="hover:text-primary transition-colors">
                  +91 98765 43210
                </a>
              </li>
            </ul>

            <h3 className="text-white font-semibold text-sm uppercase tracking-widest pt-2">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy-policy" className="text-gray-400 hover:text-primary transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-primary transition-colors">Terms & Conditions</Link>
              </li>
              <li>
                <Link href="/refund-policy" className="text-gray-400 hover:text-primary transition-colors">Refund Policy</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} SimpleSamaj. All rights reserved.</p>
          <p>Made with ❤️ for Marathi professionals across Maharashtra</p>
        </div>
      </div>
    </footer>
  );
}
