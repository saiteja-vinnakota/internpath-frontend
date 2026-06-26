import { Link } from "react-router-dom";

function FooterLink({ to, children }) {
  return (
    <Link to={to} className="block text-sm text-muted hover:text-primary transition-colors">
      {children}
    </Link>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* BRAND */}
          <div className="md:col-span-2">
            <p className="text-lg font-bold text-primary">InternPath</p>
            <p className="mt-3 text-sm text-muted leading-6 max-w-xs">
              AI-powered internship platform connecting students with recruiters
              through smarter matching and streamlined hiring.
            </p>
          </div>

          {/* PLATFORM */}
          <div>
            <p className="text-sm font-semibold text-primary">Platform</p>
            <div className="mt-4 space-y-3">
              <FooterLink to="/jobs">Explore Jobs</FooterLink>
              <FooterLink to="/login">Login</FooterLink>
              <FooterLink to="/register">Register</FooterLink>
            </div>
          </div>

          {/* RESOURCES */}
          <div>
            <p className="text-sm font-semibold text-primary">Resources</p>
            <div className="mt-4 space-y-3">
              <p className="text-sm text-muted cursor-pointer hover:text-primary transition-colors">Privacy Policy</p>
              <p className="text-sm text-muted cursor-pointer hover:text-primary transition-colors">Terms of Service</p>
              <p className="text-sm text-muted cursor-pointer hover:text-primary transition-colors">Contact Support</p>
            </div>
          </div>

        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted">© 2026 InternPath. All rights reserved.</p>
          <p className="text-xs text-muted">Made for students, by builders.</p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;