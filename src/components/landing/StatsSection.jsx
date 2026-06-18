function StatsSection() {

  const stats = [
    {
      value: "500+",
      label: "Students",
      description:
        "Actively exploring internships",
    },
    {
      value: "120+",
      label: "Internships",
      description:
        "Opportunities across domains",
    },
    {
      value: "50+",
      label: "Recruiters",
      description:
        "Hiring through InternPath",
    },
    {
      value: "2000+",
      label: "Applications",
      description:
        "Submitted by students",
    },
  ];

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
        {/* HEADER */}
        <div
          className="
            text-center
            max-w-3xl
            mx-auto
          "
        >
          <h2
            className="
              text-4xl
              lg:text-5xl
              font-semibold
              tracking-tight
              text-primary
            "
          >
            Growing Internship
            Ecosystem
          </h2>

          <p
            className="
              mt-5
              text-lg
              leading-8
              text-muted
            "
          >
            Connecting students and recruiters
            through a streamlined internship
            discovery and hiring experience.
          </p>
        </div>

        {/* STATS */}
        <div
          className="
            mt-16

            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-4

            gap-6
          "
        >
          {stats.map((stat) => (

            <div
              key={stat.label}
              className="
                bg-white

                border
                border-border

                rounded-[32px]

                p-8

                text-center
              "
            >
              <h3
                className="
                  text-5xl
                  font-semibold
                  text-primary
                "
              >
                {stat.value}
              </h3>

              <p
                className="
                  mt-4
                  text-lg
                  font-medium
                  text-primary
                "
              >
                {stat.label}
              </p>

              <p
                className="
                  mt-3
                  text-sm
                  leading-6
                  text-muted
                "
              >
                {stat.description}
              </p>
            </div>

          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsSection;