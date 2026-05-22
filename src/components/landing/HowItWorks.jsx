import {
  Upload,
  BrainCircuit,
  Briefcase,
} from "lucide-react";

const steps = [
  {
    icon: Upload,
    number: "01",
    title: "Upload Resume",
    description:
      "Upload your resume and let InternPath automatically extract skills, technologies, and project experience.",
  },

  {
    icon: BrainCircuit,
    number: "02",
    title: "AI Match Analysis",
    description:
      "Our AI compares your profile with internship requirements and generates smart match insights.",
  },

  {
    icon: Briefcase,
    number: "03",
    title: "Apply & Track",
    description:
      "Apply to relevant internships and monitor application progress with real-time updates.",
  },
];

function HowItWorks() {
  return (
    <section className="
      py-24
      px-6
      lg:px-10
      bg-stone/40
    ">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="max-w-3xl">

          <p className="
            text-accent
            font-medium
            mb-4
          ">
            Workflow
          </p>

          <h2 className="
            font-serif
            text-4xl
            md:text-5xl
            leading-tight
            text-primary
          ">
            A smarter way to find internships
          </h2>

          <p className="
            mt-6
            text-lg
            leading-8
            text-muted
          ">
            InternPath simplifies internship discovery
            using AI-powered recommendations and
            streamlined application management.
          </p>

        </div>

        {/* STEPS */}
        <div className="
          mt-16
          grid
          grid-cols-1
          md:grid-cols-3
          gap-6
        ">

          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="
                  bg-white
                  border
                  border-border
                  rounded-3xl
                  p-8
                  relative
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-medium
                "
              >

                {/* STEP NUMBER */}
                <span className="
                  absolute
                  top-6
                  right-6
                  text-5xl
                  font-serif
                  text-stone
                ">
                  {step.number}
                </span>

                {/* ICON */}
                <div className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-stone
                  flex
                  items-center
                  justify-center
                ">
                  <Icon
                    size={28}
                    className="text-primary"
                  />
                </div>

                {/* TITLE */}
                <h3 className="
                  mt-8
                  text-2xl
                  font-semibold
                  text-primary
                ">
                  {step.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="
                  mt-4
                  text-muted
                  leading-7
                ">
                  {step.description}
                </p>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}

export default HowItWorks;