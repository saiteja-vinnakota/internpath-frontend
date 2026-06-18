import { ArrowRight, BriefcaseBusiness, Sparkles, Users } from "lucide-react";

import { Link } from "react-router-dom";

import Button from "../ui/Button";

function HeroSection() {
  return (
    <section
      id="home"
      className="
        relative
        overflow-hidden
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
            gap-16
            items-center
          "
        >
          {/* LEFT */}
          <div>
            {/* BADGE */}
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
                text-primary
                font-medium
              "
            >
              <Sparkles size={16} />
              AI Powered Internship Platform
            </div>

            {/* TITLE */}
            <h1
              className="
                mt-8

                text-5xl
                sm:text-6xl
                lg:text-7xl

                font-semibold

                tracking-tight

                text-primary

                leading-[1.05]
              "
            >
              Find Internships
              <br />
              That Match
              <br />
              Your Skills
            </h1>

            {/* DESCRIPTION */}
            <p
              className="
                mt-8

                max-w-xl

                text-lg
                leading-8

                text-muted
              "
            >
              InternPath helps students discover relevant internships using
              AI-powered matching while enabling recruiters to identify
              qualified candidates faster.
            </p>

            {/* BUTTONS */}
            <div
              className="
                mt-10

                flex
                flex-wrap

                gap-4
              "
            >
              <Link to="/register">
                <Button
                  className="
                    h-14
                    px-7
                    rounded-2xl
                  "
                >
                  Get Started
                  <ArrowRight size={18} />
                </Button>
              </Link>

              <a href="#ai-matching">
                <Button
                  variant="secondary"
                  className="
                    h-14
                    px-7
                    rounded-2xl
                  "
                >
                  Learn More
                </Button>
              </a>
            </div>

            {/* STATS */}
            <div
              className="
                mt-14

                grid
                grid-cols-3

                gap-4
                sm:gap-6
              "
            >
              <div>
                <h3
                  className="
                    text-3xl
                    font-semibold
                    text-primary
                  "
                >
                  500+
                </h3>

                <p
                  className="
                    mt-2
                    text-sm
                    text-muted
                  "
                >
                  Students
                </p>
              </div>

              <div>
                <h3
                  className="
                    text-3xl
                    font-semibold
                    text-primary
                  "
                >
                  120+
                </h3>

                <p
                  className="
                    mt-2
                    text-sm
                    text-muted
                  "
                >
                  Internships
                </p>
              </div>

              <div>
                <h3
                  className="
                    text-3xl
                    font-semibold
                    text-primary
                  "
                >
                  50+
                </h3>

                <p
                  className="
                    mt-2
                    text-sm
                    text-muted
                  "
                >
                  Recruiters
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div
            className="
              relative
              max-w-xl
              mx-auto
              w-full
            "
          >
            <div
              className="
                space-y-5
              "
            >
              {/* CARD 1 */}
              <div
                className="
                  bg-white
                  border
                  border-border

                  rounded-[32px]

                  p-6
                "
              >
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
                      AI Match Score
                    </p>

                    <h3
                      className="
                        mt-2
                        text-4xl
                        font-semibold
                        text-primary
                      "
                    >
                      92%
                    </h3>
                  </div>

                  <div
                    className="
                      w-14
                      h-14

                      rounded-2xl

                      bg-blue-50

                      flex
                      items-center
                      justify-center
                    "
                  >
                    <Sparkles
                      className="
                        text-accent
                      "
                    />
                  </div>
                </div>
              </div>

              {/* CARD 2 */}
              <div
                className="
                  bg-white
                  border
                  border-border

                  rounded-[32px]

                  p-6
                "
              >
                <p
                  className="
                    text-sm
                    text-muted
                  "
                >
                  Recommended Internship
                </p>

                <h3
                  className="
                    mt-3

                    text-2xl
                    font-semibold

                    text-primary
                  "
                >
                  Frontend Developer Intern
                </h3>

                <p
                  className="
                    mt-2
                    text-muted
                  "
                >
                  Google
                </p>

                <div
                  className="
                    mt-6

                    flex
                    gap-2
                    flex-wrap
                  "
                >
                  <span
                    className="
                      px-3
                      py-2

                      rounded-full

                      bg-stone

                      text-sm
                    "
                  >
                    React
                  </span>

                  <span
                    className="
                      px-3
                      py-2

                      rounded-full

                      bg-stone

                      text-sm
                    "
                  >
                    JavaScript
                  </span>

                  <span
                    className="
                      px-3
                      py-2

                      rounded-full

                      bg-stone

                      text-sm
                    "
                  >
                    UI
                  </span>
                </div>
              </div>

              {/* CARD 3 */}
              <div
                className="
                  bg-white
                  border
                  border-border

                  rounded-[32px]

                  p-6
                "
              >
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
                      Active Applications
                    </p>

                    <h3
                      className="
                        mt-2

                        text-4xl
                        font-semibold

                        text-primary
                      "
                    >
                      24
                    </h3>
                  </div>

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
                    <Users size={26} />
                  </div>
                </div>
              </div>

              {/* CARD 4 */}
              <div
                className="
                  bg-white
                  border
                  border-border

                  rounded-[32px]

                  p-6
                "
              >
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
                      Manage Applicants
                    </h3>
                  </div>

                  <BriefcaseBusiness size={28} />
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
