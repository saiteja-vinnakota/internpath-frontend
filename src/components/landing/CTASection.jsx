import { ArrowRight } from "lucide-react";

import { Link } from "react-router-dom";

import Button from "../ui/Button";

function CTASection() {
  return (
    <section
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
            bg-white

            border
            border-border

            rounded-[40px]

            p-8
            sm:p-12
            lg:p-16

            text-center
          "
        >
          <h2
            className="
              text-4xl
              lg:text-6xl

              font-semibold

              tracking-tight

              text-primary
            "
          >
            Ready To Start
            <br />
            Your Career Journey?
          </h2>

          <p
            className="
              mt-6

              max-w-2xl
              mx-auto

              text-lg
              leading-8

              text-muted
            "
          >
            Join InternPath and discover internships tailored to your skills
            while helping recruiters find the right talent faster.
          </p>

          <div
            className="
              mt-10

              flex
              flex-wrap

              justify-center

              gap-4
            "
          >
            <Link to="/register?role=student">
              <Button
                className="
                  h-14
                  px-7
                  rounded-2xl
                "
              >
                Join As Student
                <ArrowRight size={18} />
              </Button>
            </Link>

            <Link to="/register?role=recruiter">
              <Button
                variant="secondary"
                className="
                  h-14
                  px-7
                  rounded-2xl
                "
              >
                Join As Recruiter
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
