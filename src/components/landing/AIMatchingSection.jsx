import { Sparkles, FileText, Brain, Target, ArrowRight } from "lucide-react";

import { Link } from "react-router-dom";
import Button from "../ui/Button";

function AIMatchingSection() {
  return (
    <section
      id="ai-matching"
      className="
        py-20
        lg:py-28
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          px-5
          sm:px-6
          lg:px-8
        "
      >
        {/* HEADER */}
        <div
          className="
            max-w-3xl
            mx-auto
            text-center
          "
        >
          <div
            className="
              inline-flex
              items-center
              gap-2

              px-4
              py-2

              rounded-full

              bg-white
              border
              border-border

              text-sm
              font-medium
              text-primary
            "
          >
            <Sparkles size={16} />
            AI Powered Matching
          </div>

          <h2
            className="
              mt-8

              text-4xl
              lg:text-5xl

              font-semibold

              tracking-tight

              text-primary
            "
          >
            Discover Opportunities That Fit Your Profile
          </h2>

          <p
            className="
              mt-6

              text-lg
              leading-8

              text-muted
            "
          >
            Our AI analyzes skills, qualifications, and internship requirements
            to recommend opportunities that align with your career goals.
          </p>
        </div>

        {/* PROCESS */}
        <div
          className="
            mt-20

            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4

            gap-6
          "
        >
          <StepCard
            icon={FileText}
            title="Upload Resume"
            description="
              Add your resume and
              professional profile.
            "
          />

          <StepCard
            icon={Brain}
            title="Skill Analysis"
            description="
              AI extracts and evaluates
              your skills and experience.
            "
          />

          <StepCard
            icon={Sparkles}
            title="Smart Matching"
            description="
              Opportunities are ranked
              based on compatibility.
            "
          />

          <StepCard
            icon={Target}
            title="Apply Confidently"
            description="
              Focus on internships with
              stronger match scores.
            "
          />
        </div>

        {/* MATCH DEMO */}
        <div
          className="
            mt-20

            bg-white
            border
            border-border

            rounded-[40px]

            p-6
            sm:p-8
            lg:p-10
          "
        >
          <div
            className="
              flex
              flex-col
              lg:flex-row

              gap-10
              lg:gap-16

              items-center
            "
          >
            {/* LEFT */}
            <div className="flex-1">
              <h3
                className="
                  text-3xl
                  font-semibold
                  text-primary
                "
              >
                Frontend Developer Intern
              </h3>

              <p
                className="
                  mt-3
                  text-muted
                "
              >
                Google
              </p>

              <div
                className="
                  mt-8
                  flex
                  flex-wrap
                  gap-3
                "
              >
                {["React", "JavaScript", "Node.js", "UI Design"].map(
                  (skill) => (
                    <span
                      key={skill}
                      className="
                      px-4
                      py-2

                      rounded-full

                      bg-stone

                      text-sm
                    "
                    >
                      {skill}
                    </span>
                  ),
                )}
              </div>
            </div>

            {/* RIGHT */}
            <div
              className="
                w-full
                lg:w-[360px]
              "
            >
              <div
                className="
                  bg-stone

                  rounded-[32px]

                  p-7
                "
              >
                <p
                  className="
                    text-sm
                    text-muted
                  "
                >
                  Match Score
                </p>

                <h3
                  className="
                    mt-3

                    text-6xl

                    font-semibold

                    text-primary
                  "
                >
                  92%
                </h3>

                {/* BAR */}
                <div
                  className="
                    mt-8

                    h-4

                    rounded-full

                    bg-white

                    overflow-hidden
                  "
                >
                  <div
                    className="
                      h-full
                      w-[92%]

                      bg-accent

                      rounded-full
                    "
                  />
                </div>

                <p
                  className="
                    mt-5

                    text-sm

                    text-muted
                    leading-6
                  "
                >
                  Strong alignment between your profile and internship
                  requirements.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div
          className="
            mt-12
            text-center
          "
        >
          <Link to="/jobs">
            <Button
              className="
                h-14
                px-7
                rounded-2xl
              "
            >
              Get Your Match Score
              <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function StepCard({ icon: Icon, title, description }) {
  return (
    <div
      className="
        bg-white

        border
        border-border

        rounded-[32px]

        p-7
      "
    >
      <div
        className="
          w-14
          h-14

          rounded-2xl

          bg-stone

          flex
          items-center
          justify-center
        "
      >
        <Icon size={24} />
      </div>

      <h3
        className="
          mt-6

          text-xl

          font-semibold

          text-primary
        "
      >
        {title}
      </h3>

      <p
        className="
          mt-3

          text-muted
          leading-7
        "
      >
        {description}
      </p>
    </div>
  );
}

export default AIMatchingSection;
