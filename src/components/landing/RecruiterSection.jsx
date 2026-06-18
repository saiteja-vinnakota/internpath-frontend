import {
  Users,
  BriefcaseBusiness,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from "lucide-react";

import { Link } from "react-router-dom";
import Button from "../ui/Button";

function RecruiterSection() {
  return (
    <section
      id="recruiters"
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
          {/* LEFT DASHBOARD */}
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
              {/* TOP */}
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
                    Recruiter Dashboard
                  </p>

                  <h3
                    className="
                      mt-2
                      text-xl
                      font-semibold
                      text-primary
                    "
                  >
                    Frontend Developer Intern
                  </h3>
                </div>

                <div
                  className="
                    px-4
                    py-2
                    rounded-full
                    bg-green-50
                    text-green-600
                    text-sm
                    font-medium
                  "
                >
                  Active
                </div>
              </div>

              {/* STATS */}
              <div
                className="
                  mt-8
                  grid
                  grid-cols-2
                  gap-4
                "
              >
                <DashboardStat value="124" label="Applicants" />

                <DashboardStat value="18" label="Shortlisted" />

                <DashboardStat value="12" label="Reviewed" />

                <DashboardStat value="3" label="Hired" />
              </div>

              {/* APPLICANTS */}
              <div
                className="
                  mt-8
                  space-y-4
                "
              >
                <ApplicantCard name="Rahul Sharma" score="94%" />

                <ApplicantCard name="Priya Verma" score="91%" />

                <ApplicantCard name="Sai Teja" score="89%" />
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT */}
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
              Built For Recruiters
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
              Hire Better Candidates Faster
            </h2>

            <p
              className="
                mt-6
                text-lg
                leading-8
                text-muted
              "
            >
              Post internships, review applicants, shortlist candidates, and
              manage hiring through a streamlined recruiter workflow.
            </p>

            <div
              className="
                mt-10
                space-y-6
              "
            >
              <FeatureItem
                icon={BriefcaseBusiness}
                title="Post Internships"
                description="
                  Create and manage internship
                  opportunities in minutes.
                "
              />

              <FeatureItem
                icon={Users}
                title="Manage Applicants"
                description="
                  Review applications and monitor
                  candidate progress.
                "
              />

              <FeatureItem
                icon={CheckCircle2}
                title="Shortlist Candidates"
                description="
                  Identify promising applicants
                  quickly and efficiently.
                "
              />

              <FeatureItem
                icon={Sparkles}
                title="AI Match Scores"
                description="
                  Instantly evaluate candidate
                  suitability for each role.
                "
              />
            </div>

            <div className="mt-10">
              <Link to="/recruiter/post-job">
                <Button
                  className="
                    h-14
                    px-7
                    rounded-2xl
                  "
                >
                  Start Hiring
                  <ArrowRight size={18} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DashboardStat({ value, label }) {
  return (
    <div
      className="
        bg-stone
        rounded-[24px]
        p-5
      "
    >
      <h4
        className="
          text-3xl
          font-semibold
          text-primary
        "
      >
        {value}
      </h4>

      <p
        className="
          mt-2
          text-sm
          text-muted
        "
      >
        {label}
      </p>
    </div>
  );
}

function ApplicantCard({ name, score }) {
  return (
    <div
      className="
        bg-stone
        rounded-[24px]
        p-5

        flex
        items-center
        justify-between
      "
    >
      <div>
        <h4
          className="
            font-medium
            text-primary
          "
        >
          {name}
        </h4>

        <p
          className="
            mt-1
            text-sm
            text-muted
          "
        >
          Frontend Developer
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
        {score}
      </div>
    </div>
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

export default RecruiterSection;
