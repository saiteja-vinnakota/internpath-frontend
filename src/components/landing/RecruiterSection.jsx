import { Users, BriefcaseBusiness, CheckCircle2, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";

const FEATURES = [
  { icon: BriefcaseBusiness, accent: { bg: "bg-blue-50",   text: "text-blue-600"   }, title: "Post Internships",    description: "Create and manage internship opportunities in minutes."              },
  { icon: Users,             accent: { bg: "bg-purple-50", text: "text-purple-600" }, title: "Manage Applicants",   description: "Review applications and monitor candidate progress in one place."   },
  { icon: CheckCircle2,      accent: { bg: "bg-amber-50",  text: "text-amber-600"  }, title: "Shortlist Candidates",description: "Identify promising applicants quickly and efficiently."              },
  { icon: Sparkles,          accent: { bg: "bg-green-50",  text: "text-green-600"  }, title: "AI Match Scores",     description: "Instantly evaluate candidate suitability for each role."            },
];

const APPLICANTS = [
  { name: "Rahul Sharma", role: "Frontend Developer", score: 94, color: "text-green-700 bg-green-50" },
  { name: "Priya Verma",  role: "Frontend Developer", score: 91, color: "text-green-700 bg-green-50" },
  { name: "Sai Teja",     role: "Frontend Developer", score: 89, color: "text-blue-700 bg-blue-50"   },
];

function RecruiterSection() {
  return (
    <section id="recruiters" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT — dashboard mockup */}
          <div className="bg-white border border-border rounded-[32px] p-6">

            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted uppercase tracking-wide">Recruiter Dashboard</p>
                <p className="mt-1.5 text-base font-semibold text-primary">Frontend Developer Intern</p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-xs font-semibold">Active</span>
            </div>

            <div className="mt-5 grid grid-cols-4 gap-3">
              {[{ v: "124", l: "Applicants" }, { v: "18", l: "Shortlisted" }, { v: "12", l: "Reviewed" }, { v: "3", l: "Hired" }].map((s) => (
                <div key={s.l} className="bg-stone rounded-2xl p-3 text-center">
                  <p className="text-xl font-bold text-primary">{s.v}</p>
                  <p className="mt-1 text-[11px] text-muted">{s.l}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 space-y-2.5">
              <p className="text-xs font-medium uppercase tracking-wide text-muted">Top Candidates</p>
              {APPLICANTS.map((a) => (
                <div key={a.name} className="flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-stone">
                  <div>
                    <p className="text-sm font-medium text-primary">{a.name}</p>
                    <p className="text-xs text-muted mt-0.5">{a.role}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${a.color}`}>
                    {a.score}%
                  </span>
                </div>
              ))}
            </div>

          </div>

          {/* RIGHT */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border text-sm font-medium text-primary">
              <Sparkles size={14} className="text-accent" />
              Built For Recruiters
            </div>

            <h2 className="mt-7 text-4xl lg:text-5xl font-semibold tracking-tight text-primary">
              Hire Better Candidates Faster
            </h2>

            <p className="mt-5 text-lg leading-8 text-muted">
              Post internships, review applicants, shortlist candidates, and
              manage hiring through a streamlined recruiter workflow.
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
              <Link to="/recruiter/post-job">
                <Button className="h-12 px-6 rounded-xl">
                  Start Hiring <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default RecruiterSection;