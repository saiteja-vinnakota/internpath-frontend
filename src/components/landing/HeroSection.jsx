import { ArrowRight, BriefcaseBusiness, Sparkles, Users } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";

function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border text-sm text-primary font-medium">
              <Sparkles size={14} className="text-accent" />
              AI Powered Internship Platform
            </div>

            <h1 className="mt-7 text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-primary leading-[1.05]">
              Find Internships
              <br />
              That Match
              <br />
              Your Skills
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-muted">
              InternPath helps students discover relevant internships using
              AI-powered matching while enabling recruiters to identify
              qualified candidates faster.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/register">
                <Button className="h-12 px-6 rounded-xl">
                  Get Started <ArrowRight size={16} />
                </Button>
              </Link>
              <a href="#ai-matching">
                <Button variant="secondary" className="h-12 px-6 rounded-xl">
                  Learn More
                </Button>
              </a>
            </div>

            {/* STATS */}
            <div className="mt-12 flex items-center gap-8">
              {[
                { value: "500+", label: "Students" },
                { value: "120+", label: "Internships" },
                { value: "50+",  label: "Recruiters" },
              ].map((s, i) => (
                <div key={s.label} className="flex items-center gap-8">
                  <div>
                    <p className="text-2xl font-bold text-primary">{s.value}</p>
                    <p className="mt-0.5 text-xs text-muted">{s.label}</p>
                  </div>
                  {i < 2 && <div className="w-px h-8 bg-border" />}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — stacked cards */}
          <div className="relative max-w-md mx-auto w-full">

            {/* shadow card behind */}
            <div className="absolute inset-4 bg-white border border-border rounded-[32px] rotate-2 opacity-50" />

            <div className="relative space-y-3">

              {/* AI MATCH SCORE */}
              <div className="bg-white border border-border rounded-[28px] p-5 flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted uppercase tracking-wide">AI Match Score</p>
                  <p className="mt-1 text-4xl font-bold text-primary">92%</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
                  <Sparkles size={20} className="text-accent" />
                </div>
              </div>

              {/* RECOMMENDED */}
              <div className="bg-white border border-border rounded-[28px] p-5">
                <p className="text-xs text-muted uppercase tracking-wide">Recommended Internship</p>
                <p className="mt-2 text-lg font-semibold text-primary">Frontend Developer Intern</p>
                <p className="mt-0.5 text-sm text-muted">Google</p>
                <div className="mt-3 flex gap-2 flex-wrap">
                  {["React", "JavaScript", "UI"].map((s) => (
                    <span key={s} className="px-3 py-1 rounded-full bg-stone text-xs text-primary">{s}</span>
                  ))}
                </div>
              </div>

              {/* ACTIVE APPLICATIONS */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white border border-border rounded-[28px] p-5">
                  <p className="text-xs text-muted uppercase tracking-wide">Applications</p>
                  <p className="mt-2 text-3xl font-bold text-primary">24</p>
                  <div className="mt-2 flex items-center gap-1.5">
                    <Users size={13} className="text-muted" />
                    <span className="text-xs text-muted">Active</span>
                  </div>
                </div>
                <div className="bg-white border border-border rounded-[28px] p-5">
                  <p className="text-xs text-muted uppercase tracking-wide">Dashboard</p>
                  <p className="mt-2 text-sm font-semibold text-primary">Manage Applicants</p>
                  <div className="mt-2 flex items-center gap-1.5">
                    <BriefcaseBusiness size={13} className="text-muted" />
                    <span className="text-xs text-muted">Recruiter</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default HeroSection;