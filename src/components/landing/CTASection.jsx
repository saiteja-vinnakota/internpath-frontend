import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";

function CTASection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="bg-primary rounded-[32px] p-8 sm:p-12 lg:p-16 text-center">

          <h2 className="text-4xl lg:text-5xl font-semibold tracking-tight text-white">
            Ready To Start
            <br />
            Your Career Journey?
          </h2>

          <p className="mt-5 max-w-xl mx-auto text-lg leading-8" style={{ color: "rgba(255,255,255,0.65)" }}>
            Join InternPath and discover internships tailored to your skills
            while helping recruiters find the right talent faster.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            {/* PRIMARY — student */}
            <Link to="/register?role=student">
              <button className="h-12 px-6 rounded-xl bg-white text-primary text-sm font-semibold flex items-center gap-2 hover:bg-stone transition-colors">
                Join As Student <ArrowRight size={16} />
              </button>
            </Link>

            {/* SECONDARY — recruiter */}
            <Link to="/register?role=recruiter">
              <button
                className="h-12 px-6 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.85)",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
                onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
              >
                Join As Recruiter
              </button>
            </Link>
          </div>

          {/* SOCIAL PROOF */}
          <p className="mt-7 text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
            500+ students · 50+ recruiters · No credit card required
          </p>

        </div>
      </div>
    </section>
  );
}

export default CTASection;