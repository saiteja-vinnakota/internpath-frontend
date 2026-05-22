import Button from "../common/Button";

function CTA() {
  return (
    <section className="px-6 lg:px-10 pb-24">

      <div className="
        max-w-7xl
        mx-auto
      ">

        <div className="
          bg-primary
          rounded-[32px]
          px-8
          md:px-16
          py-20
          text-center
        ">

          {/* HEADING */}
          <h2 className="
            font-serif
            text-4xl
            md:text-6xl
            leading-tight
            text-white
            max-w-4xl
            mx-auto
          ">
            Start applying smarter with InternPath
          </h2>

          {/* DESCRIPTION */}
          <p className="
            mt-6
            text-lg
            leading-8
            text-white/70
            max-w-2xl
            mx-auto
          ">
            Discover internships that actually match
            your skills and simplify the application
            process with AI-powered insights.
          </p>

          {/* BUTTONS */}
          <div className="
            mt-10
            flex
            flex-col
            sm:flex-row
            justify-center
            gap-4
          ">

            <Button
              variant="white"
            >
              Explore Internships
            </Button>

            <Button
              variant="outline"
              className="
                border-white/20
                text-white
                hover:bg-white/10
              "
            >
              Recruiter Portal
            </Button>

          </div>

        </div>

      </div>

    </section>
  );
}

export default CTA;