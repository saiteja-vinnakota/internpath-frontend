import {
  Bookmark,
  FileText,
  Sparkles,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

import { Link } from "react-router-dom";
import Button from "../ui/Button";

function StudentSection() {
  return (
    <section
      id="students"
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
        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-12
            lg:gap-20
            items-center
          "
        >
          {/* LEFT */}
          <div>
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
              Built For Students
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
              Everything You Need To Launch Your Career
            </h2>

            <p
              className="
                mt-6

                text-lg
                leading-8

                text-muted
              "
            >
              Discover opportunities that align with your skills, track your
              applications, and receive AI-powered recommendations tailored to
              your profile.
            </p>

            <div
              className="
                mt-10
                space-y-6
              "
            >
              <FeatureItem
                icon={Sparkles}
                title="AI Match Scoring"
                description="
                  Understand how well your profile
                  matches an internship before
                  applying.
                "
              />

              <FeatureItem
                icon={Bookmark}
                title="Save Opportunities"
                description="
                  Bookmark internships and revisit
                  them whenever you're ready.
                "
              />

              <FeatureItem
                icon={FileText}
                title="Application Tracking"
                description="
                  Monitor application progress
                  from submission to final review.
                "
              />

              <FeatureItem
                icon={TrendingUp}
                title="Career Growth"
                description="
                  Build a strong profile and
                  discover opportunities aligned
                  with your interests.
                "
              />
            </div>

            <div className="mt-10">
              <Link to="/jobs">
                <Button
                  className="
                    h-14
                    px-7
                    rounded-2xl
                  "
                >
                  Explore Opportunities
                  <ArrowRight size={18} />
                </Button>
              </Link>
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <div
              className="
                bg-white
                border
                border-border

                rounded-[36px]

                p-7
              "
            >
              {/* PROFILE */}
              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >
                <div>
                  <p
                    className="
                      text-sm
                      text-muted
                    "
                  >
                    Student Profile
                  </p>

                  <h3
                    className="
                      mt-2
                      text-xl
                      font-semibold
                      text-primary
                    "
                  >
                    Frontend Developer
                  </h3>
                </div>

                <div
                  className="
                    px-4
                    py-2

                    rounded-full

                    bg-blue-50

                    text-accent
                    text-sm
                    font-medium
                  "
                >
                  92% Match
                </div>
              </div>

              {/* SKILLS */}
              <div
                className="
                  mt-8

                  flex
                  flex-wrap
                  gap-3
                "
              >
                {["React", "JavaScript", "Node.js", "MongoDB"].map((skill) => (
                  <div
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
                  </div>
                ))}
              </div>

              {/* APPLICATIONS */}
              <div
                className="
                  mt-8

                  space-y-4
                "
              >
                <ApplicationCard
                  title="
                    Frontend Intern
                  "
                  company="Google"
                  status="Under Review"
                />

                <ApplicationCard
                  title="
                    React Developer Intern
                  "
                  company="Microsoft"
                  status="Shortlisted"
                />

                <ApplicationCard
                  title="
                    UI Developer Intern
                  "
                  company="Amazon"
                  status="Applied"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureItem({ icon: Icon, title, description }) {
  return (
    <div
      className="
        flex
        items-start
        gap-4
      "
    >
      <div
        className="
          w-12
          h-12

          rounded-2xl

          bg-white
          border
          border-border

          flex
          items-center
          justify-center

          flex-shrink-0
        "
      >
        <Icon size={20} />
      </div>

      <div>
        <h3
          className="
            text-lg
            font-semibold
            text-primary
          "
        >
          {title}
        </h3>

        <p
          className="
            mt-2

            text-muted
            leading-7
          "
        >
          {description}
        </p>
      </div>
    </div>
  );
}

function ApplicationCard({ title, company, status }) {
  return (
    <div
      className="
        p-5

        rounded-[24px]

        bg-stone

        flex
        items-center
        justify-between
        gap-4
      "
    >
      <div>
        <h4
          className="
            font-medium
            text-primary
          "
        >
          {title}
        </h4>

        <p
          className="
            mt-1
            text-sm
            text-muted
          "
        >
          {company}
        </p>
      </div>

      <div
        className="
          px-3
          py-1.5

          rounded-full

          bg-white

          text-sm
          font-medium
          text-primary
        "
      >
        {status}
      </div>
    </div>
  );
}

export default StudentSection;
