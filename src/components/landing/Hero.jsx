import Button from "../common/Button";

function Hero() {
  return (
    <section
      className="
        min-h-screen
        flex
        items-center
        justify-center
        px-6
        lg:px-10
        pt-28
        pb-20
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          grid
          lg:grid-cols-2
          gap-16
          items-center
        "
      >

        {/* LEFT CONTENT */}
        <div>

          {/* SMALL BADGE */}
          <div
            className="
              inline-flex
              items-center
              gap-2
              px-4
              py-2
              rounded-full
              bg-blue-50
              border
              border-blue-100
              text-accent
              text-sm
              font-medium
              mb-8
            "
          >
            AI Powered Internship Platform
          </div>

          {/* MAIN HEADING */}
          <h1
            className="
              font-serif
              text-5xl
              sm:text-6xl
              lg:text-7xl
              leading-tight
              text-primary
            "
          >
            Find internships that truly match your skills
          </h1>

          {/* DESCRIPTION */}
          <p
            className="
              mt-8
              text-lg
              leading-8
              text-muted
              max-w-xl
            "
          >
            InternPath helps students discover better
            internships using AI-powered resume matching,
            smart filtering, and real-time application tracking.
          </p>

          {/* CTA BUTTONS */}
          <div
            className="
              mt-10
              flex
              flex-col
              sm:flex-row
              gap-4
            "
          >
            <Button>
              Explore Internships
            </Button>

            <Button variant="outline">
              Recruiter Portal
            </Button>
          </div>

        </div>

        {/* RIGHT SIDE UI PREVIEW */}
        <div
          className="
            bg-white
            border
            border-border
            rounded-3xl
            shadow-medium
            p-6
          "
        >

          {/* TOP */}
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-muted">
                Recommended Match
              </p>

              <h3
                className="
                  mt-1
                  text-2xl
                  font-semibold
                  text-primary
                "
              >
                Frontend Developer Intern
              </h3>
            </div>

            <div
              className="
                w-16
                h-16
                rounded-2xl
                bg-green-50
                flex
                items-center
                justify-center
                text-green
                text-xl
                font-bold
              "
            >
              91%
            </div>

          </div>

          {/* SKILLS */}
          <div className="mt-8">

            <p className="text-sm text-muted mb-4">
              Matched Skills
            </p>

            <div className="flex flex-wrap gap-3">

              {[
                "React",
                "Node.js",
                "MongoDB",
                "Tailwind",
                "JavaScript",
              ].map((skill) => (
                <span
                  key={skill}
                  className="
                    px-4
                    py-2
                    rounded-full
                    bg-stone
                    text-sm
                    text-primary
                    font-medium
                  "
                >
                  {skill}
                </span>
              ))}

            </div>

          </div>

          {/* MATCH DETAILS */}
          <div
            className="
              mt-10
              space-y-5
            "
          >

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted">
                  Resume Match
                </span>

                <span className="font-medium">
                  91%
                </span>
              </div>

              <div className="h-2 bg-stone rounded-full overflow-hidden">
                <div className="w-[91%] h-full bg-green rounded-full"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted">
                  Skills Alignment
                </span>

                <span className="font-medium">
                  87%
                </span>
              </div>

              <div className="h-2 bg-stone rounded-full overflow-hidden">
                <div className="w-[87%] h-full bg-accent rounded-full"></div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;