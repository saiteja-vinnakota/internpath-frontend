import {
  Brain,
  FileText,
  Bell,
  LayoutDashboard,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Match Scoring",
    description:
      "Analyze resumes against internship requirements and generate intelligent match scores instantly.",
  },

  {
    icon: FileText,
    title: "Resume Parsing",
    description:
      "Automatically extract skills, projects, technologies, and experience from uploaded resumes.",
  },

  {
    icon: Bell,
    title: "Application Tracking",
    description:
      "Track application progress in real time with status updates and smart notifications.",
  },

  {
    icon: LayoutDashboard,
    title: "Recruiter Dashboard",
    description:
      "Manage internships, review applicants, and shortlist candidates efficiently.",
  },
];

function Features() {
  return (
    <section className="py-24 px-6 lg:px-10">

      <div className="max-w-7xl mx-auto">

        {/* SECTION HEADER */}
        <div className="max-w-3xl">

          <p className="
            text-accent
            font-medium
            mb-4
          ">
            Platform Features
          </p>

          <h2 className="
            font-serif
            text-4xl
            md:text-5xl
            leading-tight
            text-primary
          ">
            Built for students and recruiters
          </h2>

          <p className="
            mt-6
            text-lg
            leading-8
            text-muted
          ">
            InternPath combines AI-powered matching,
            modern dashboards, and application tracking
            into one streamlined internship platform.
          </p>

        </div>

        {/* FEATURES GRID */}
        <div className="
          mt-16
          grid
          grid-cols-1
          sm:grid-cols-2
          gap-6
        ">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="
                  bg-white
                  border
                  border-border
                  rounded-3xl
                  p-8
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-medium
                "
              >

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
                  {feature.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="
                  mt-4
                  text-muted
                  leading-7
                ">
                  {feature.description}
                </p>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}

export default Features;