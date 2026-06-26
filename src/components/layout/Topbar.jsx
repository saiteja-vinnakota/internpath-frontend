import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "../ui/Button";
import { useAuth } from "../../context/AuthContext";

const NAV_LINKS = [
  { label: "Home",        href: "#home"        },
  { label: "Students",    href: "#students"    },
  { label: "Recruiters",  href: "#recruiters"  },
  { label: "AI Matching", href: "#ai-matching" },
  { label: "Features",    href: "#features"    },
];

function Topbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled,   setScrolled]   = useState(false);

  const { user } = useAuth();
  const isStudent   = user?.role === "student";
  const isRecruiter = user?.role === "recruiter";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300
        ${scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-border shadow-soft"
          : "bg-transparent border-b border-transparent"}
      `}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
            <svg viewBox="0 0 18 18" className="w-4 h-4" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
              <path d="M3 14l3-4 3 2 3-5 3 4" />
              <circle cx="9" cy="4" r="1.5" />
            </svg>
          </div>
          <span className="text-base font-bold text-primary tracking-tight">InternPath</span>
        </Link>

        {/* CENTER NAV */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3 py-1.5 rounded-lg text-sm text-muted hover:text-primary hover:bg-stone transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="hidden md:flex items-center gap-2">
          {!user && (
            <>
              <Link to="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button>Get Started</Button>
              </Link>
            </>
          )}

          {isStudent && (
            <>
              <Link to="/jobs">
                <Button variant="secondary">Explore Jobs</Button>
              </Link>
              <Link to="/student/dashboard">
                <Button>Dashboard</Button>
              </Link>
            </>
          )}

          {isRecruiter && (
            <>
              <Link to="/recruiter/post-job">
                <Button variant="secondary">Post Job</Button>
              </Link>
              <Link to="/recruiter/dashboard">
                <Button>Dashboard</Button>
              </Link>
            </>
          )}
        </div>

        {/* MOBILE TOGGLE */}
        <button
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl border border-border bg-white text-primary"
          onClick={() => setMobileMenu((v) => !v)}
        >
          {mobileMenu ? <X size={18} /> : <Menu size={18} />}
        </button>

      </div>

      {/* MOBILE MENU */}
      {mobileMenu && (
        <div className="md:hidden bg-white border-t border-border px-5 py-5 space-y-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenu(false)}
              className="block px-4 py-2.5 rounded-xl text-sm font-medium text-muted hover:text-primary hover:bg-stone transition-colors"
            >
              {link.label}
            </a>
          ))}

          <div className="pt-4 mt-2 border-t border-border flex flex-col gap-2">
            {!user && (
              <>
                <Link to="/login" onClick={() => setMobileMenu(false)}>
                  <Button variant="secondary" className="w-full">Sign In</Button>
                </Link>
                <Link to="/register" onClick={() => setMobileMenu(false)}>
                  <Button className="w-full">Get Started</Button>
                </Link>
              </>
            )}

            {isStudent && (
              <>
                <Link to="/jobs" onClick={() => setMobileMenu(false)}>
                  <Button variant="secondary" className="w-full">Explore Jobs</Button>
                </Link>
                <Link to="/student/dashboard" onClick={() => setMobileMenu(false)}>
                  <Button className="w-full">Dashboard</Button>
                </Link>
              </>
            )}

            {isRecruiter && (
              <>
                <Link to="/recruiter/post-job" onClick={() => setMobileMenu(false)}>
                  <Button variant="secondary" className="w-full">Post Job</Button>
                </Link>
                <Link to="/recruiter/dashboard" onClick={() => setMobileMenu(false)}>
                  <Button className="w-full">Dashboard</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Topbar;