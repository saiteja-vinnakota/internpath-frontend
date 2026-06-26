import { Sparkles, FileText, Brain, Target, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";

const STEPS = [
  { icon: FileText, accent: { bg: "bg-blue-50",   text: "text-blue-600"   }, step: "01", title: "Upload Resume",    description: "Add your resume and professional profile to get started."                    },
  { icon: Brain,    accent: { bg: "bg-purple-50", text: "text-purple-600" }, step: "02", title: "Skill Analysis",   description: "AI extracts and evaluates your skills and experience automatically."       },
  { icon: Sparkles, accent: { bg: "bg-amber-50",  text: "text-amber-600"  }, step: "03", title: "Smart Matching",   description: "Opportunities are ranked and scored based on your compatibility."          },
  { icon: Target,   accent: { bg: "bg-green-50",  text: "text-green-600"  }, step: "04", title: "Apply Confidently",description: "Focus on internships with stronger match scores and higher success rates." },
];

function AIMatchingSection() {
  return (
    <section id="ai-matching" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border text-sm font-medium text-primary">
            <Sparkles size={14} className="text-accent" />
            AI Powered Matching
          </div>
          <h2 className="mt-7 text-4xl lg:text-5xl font-semibold tracking-tight text-primary">
            Discover Opportunities That Fit Your Profile
          </h2>
          <p className="mt-5 text-lg leading-8 text-muted">
            Our AI analyzes skills, qualifications, and internship requirements
            to recommend opportunities that align with your career goals.
          </p>
        </div>

        {/* STEPS */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {STEPS.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="bg-white border border-border rounded-[28px] p-6">
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.accent.bg}`}>
                    <Icon size={18} className={s.accent.text} />
                  </div>
                  <span className="text-xs font-bold text-muted">{s.step}</span>
                </div>
                <h3 className="mt-5 text-base font-semibold text-primary">{s.title}</h3>
                <p className="mt-2 text-sm text-muted leading-6">{s.description}</p>
              </div>
            );
          })}
        </div>

        {/* DEMO CARD */}
        <div className="mt-10 bg-white border border-border rounded-[32px] p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">

            {/* LEFT */}
            <div className="flex-1">
              <p className="text-xs text-muted uppercase tracking-wide">Live Demo</p>
              <h3 className="mt-2 text-2xl font-semibold text-primary">Frontend Developer Intern</h3>
              <p className="mt-1 text-sm text-muted">Google · Remote · 3 Months</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["React", "JavaScript", "Node.js", "UI Design"].map((skill) => (
                  <span key={skill} className="px-3 py-1.5 rounded-full bg-stone text-xs text-primary">{skill}</span>
                ))}
              </div>
            </div>

            {/* RIGHT */}
            <div className="w-full lg:w-72 bg-stone rounded-[24px] p-6">
              <p className="text-xs text-muted uppercase tracking-wide">Your Match Score</p>
              <p className="mt-2 text-6xl font-bold text-primary">92%</p>
              <div className="mt-5 h-2 rounded-full bg-white overflow-hidden">
                <div className="h-full w-[92%] bg-accent rounded-full" />
              </div>
              <p className="mt-3 text-xs text-muted leading-5">
                Strong alignment between your profile and internship requirements.
              </p>
            </div>

          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <Link to="/jobs">
            <Button className="h-12 px-6 rounded-xl">
              Get Your Match Score <ArrowRight size={16} />
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
}

export default AIMatchingSection;