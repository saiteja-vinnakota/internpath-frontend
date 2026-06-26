import { Users, BriefcaseBusiness, FileText, TrendingUp } from "lucide-react";

const STATS = [
  { value: "500+",  label: "Students",     description: "Actively exploring internships",    icon: Users,              accent: { bg: "bg-blue-50",   text: "text-blue-600"   } },
  { value: "120+",  label: "Internships",  description: "Opportunities across domains",      icon: BriefcaseBusiness,  accent: { bg: "bg-purple-50", text: "text-purple-600" } },
  { value: "50+",   label: "Recruiters",   description: "Hiring through InternPath",         icon: TrendingUp,         accent: { bg: "bg-amber-50",  text: "text-amber-600"  } },
  { value: "2000+", label: "Applications", description: "Submitted by students",             icon: FileText,           accent: { bg: "bg-green-50",  text: "text-green-600"  } },
];

function StatsSection() {
  return (
    <section className="py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-semibold tracking-tight text-primary">
            Growing Internship Ecosystem
          </h2>
          <p className="mt-5 text-lg leading-8 text-muted">
            Connecting students and recruiters through a streamlined internship
            discovery and hiring experience.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-white border border-border rounded-[28px] p-7"
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${stat.accent.bg}`}>
                  <Icon size={20} className={stat.accent.text} />
                </div>
                <p className="mt-5 text-4xl font-bold text-primary">{stat.value}</p>
                <p className="mt-2 text-base font-semibold text-primary">{stat.label}</p>
                <p className="mt-1 text-sm text-muted">{stat.description}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default StatsSection;