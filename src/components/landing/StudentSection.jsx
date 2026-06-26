import { Bookmark, FileText, Sparkles, TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";

const FEATURES = [
  { icon: Sparkles,   accent: { bg: "bg-blue-50",   text: "text-blue-600"   }, title: "AI Match Scoring",      description: "Understand how well your profile matches an internship before applying."       },
  { icon: Bookmark,   accent: { bg: "bg-purple-50", text: "text-purple-600" }, title: "Save Opportunities",    description: "Bookmark internships and revisit them whenever you're ready to apply."        },
  { icon: FileText,   accent: { bg: "bg-amber-50",  text: "text-amber-600"  }, title: "Application Tracking",  description: "Monitor application progress from submission to final review."                },
  { icon: TrendingUp, accent: { bg: "bg-green-50",  text: "text-green-600"  }, title: "Career Growth",         description: "Build a strong profile and discover opportunities aligned with your interests." },
];

const APP_STATUS = {
  "Under Review": { bg: "bg-amber-50",  text: "text-amber-700"  },
  "Shortlisted":  { bg: "bg-purple-50", text: "text-purple-700" },
  "Applied":      { bg: "bg-blue-50",   text: "text-blue-700"   },
};

function ApplicationRow({ title, company, status }) {
  const colors = APP_STATUS[status] || { bg: "bg-stone", text: "text-primary" };
  return (
    <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-stone">
      <div>
        <p className="text-sm font-medium text-primary">{title}</p>
        <p className="mt-0.5 text-xs text-muted">{company}</p>
      </div>
      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${colors.bg} ${colors.text}`}>
        {status}
      </span>
    </div>
  );
}

function StudentSection() {
  return (
    <section id="students" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border text-sm font-medium text-primary">
              <Sparkles size={14} className="text-accent" />
              Built For Students
            </div>

            <h2 className="mt-7 text-4xl lg:text-5xl font-semibold tracking-tight text-primary">
              Everything You Need To Launch Your Career
            </h2>

            <p className="mt-5 text-lg leading-8 text-muted">
              Discover opportunities that align with your skills, track your
              applications, and receive AI-powered recommendations tailored to
              your profile.
            </p>

            <div className="mt-9 space-y-5">
              {FEATURES.map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.title} className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${f.accent.bg}`}>
                      <Icon size={18} className={f.accent.text} />
                    </div>
                    <div>
                      <p className="text-base font-semibold text-primary">{f.title}</p>
                      <p className="mt-1 text-sm text-muted leading-6">{f.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-9">
              <Link to="/jobs">
                <Button className="h-12 px-6 rounded-xl">
                  Explore Opportunities <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </div>

          {/* RIGHT — mockup */}
          <div className="bg-white border border-border rounded-[32px] p-6">

            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted uppercase tracking-wide">Student Profile</p>
                <p className="mt-1.5 text-lg font-semibold text-primary">Frontend Developer</p>
              </div>
              <span className="px-3 py-1.5 rounded-full bg-green-50 text-green-700 text-xs font-semibold">
                92% Match
              </span>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {["React", "JavaScript", "Node.js", "MongoDB"].map((s) => (
                <span key={s} className="px-3 py-1.5 rounded-full bg-stone text-xs text-primary">{s}</span>
              ))}
            </div>

            <div className="mt-6 space-y-3">
              <p className="text-xs font-medium uppercase tracking-wide text-muted">Recent Applications</p>
              <ApplicationRow title="Frontend Intern"      company="Google"    status="Under Review" />
              <ApplicationRow title="React Developer Intern" company="Microsoft" status="Shortlisted"  />
              <ApplicationRow title="UI Developer Intern"  company="Amazon"    status="Applied"      />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default StudentSection;