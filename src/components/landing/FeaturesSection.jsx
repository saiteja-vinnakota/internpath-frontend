import { Sparkles, Search, Bookmark, FileText, Bell, BriefcaseBusiness } from "lucide-react";

const FEATURES = [
  { icon: Sparkles,         accent: { bg: "bg-blue-50",   text: "text-blue-600"   }, title: "AI Matching",           description: "Receive personalized internship recommendations scored against your resume and skills."          },
  { icon: Search,           accent: { bg: "bg-purple-50", text: "text-purple-600" }, title: "Smart Search",          description: "Find opportunities quickly using filters for skills, location, stipend, and work mode."         },
  { icon: Bookmark,         accent: { bg: "bg-amber-50",  text: "text-amber-600"  }, title: "Saved Jobs",            description: "Bookmark internships and revisit them whenever you're ready to apply."                        },
  { icon: FileText,         accent: { bg: "bg-green-50",  text: "text-green-600"  }, title: "Application Tracking",  description: "Track every application from submission through shortlisting, interview, and selection."         },
  { icon: BriefcaseBusiness,accent: { bg: "bg-blue-50",   text: "text-blue-600"   }, title: "Recruiter Dashboard",   description: "Post internships, review applicants, and manage your entire hiring pipeline efficiently."         },
  { icon: Bell,             accent: { bg: "bg-purple-50", text: "text-purple-600" }, title: "Real-time Notifications",description: "Stay updated on application status changes, shortlisting, and important internship deadlines."  },
];

function FeaturesSection() {
  return (
    <section id="features" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-semibold tracking-tight text-primary">
            Everything You Need In One Platform
          </h2>
          <p className="mt-5 text-lg leading-8 text-muted">
            InternPath combines internship discovery, AI-powered matching,
            application management, and recruiter workflows into a single
            streamlined experience.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="bg-white border border-border rounded-[28px] p-6">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${f.accent.bg}`}>
                  <Icon size={20} className={f.accent.text} />
                </div>
                <h3 className="mt-5 text-base font-semibold text-primary">{f.title}</h3>
                <p className="mt-2 text-sm text-muted leading-6">{f.description}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default FeaturesSection;