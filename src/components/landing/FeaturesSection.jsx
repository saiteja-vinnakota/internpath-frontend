import {
  Sparkles,
  Search,
  Bookmark,
  FileText,
  Bell,
  BriefcaseBusiness,
} from "lucide-react";

function FeaturesSection() {
  const features = [
    {
      icon: Sparkles,
      title: "AI Matching",
      description:
        "Receive internship recommendations based on your skills and profile.",
    },
    {
      icon: Search,
      title: "Smart Search",
      description:
        "Find opportunities quickly using filters for skills, location, stipend, and mode.",
    },
    {
      icon: Bookmark,
      title: "Saved Jobs",
      description:
        "Bookmark internships and revisit them whenever you're ready to apply.",
    },
    {
      icon: FileText,
      title: "Application Tracking",
      description:
        "Track your applications from submission through review and selection.",
    },
    {
      icon: BriefcaseBusiness,
      title: "Recruiter Dashboard",
      description:
        "Manage internships, review applicants, and close positions efficiently.",
    },
    {
      icon: Bell,
      title: "Notifications",
      description:
        "Stay updated with application activity and important internship updates.",
    },
  ];

  return (
    <section
      id="features"
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
          <h2
            className="
              text-4xl
              lg:text-5xl

              font-semibold

              tracking-tight

              text-primary
            "
          >
            Everything You Need
            In One Platform
          </h2>

          <p
            className="
              mt-6

              text-lg
              leading-8

              text-muted
            "
          >
            InternPath combines internship
            discovery, AI-powered matching,
            application management, and
            recruiter workflows into a
            single streamlined experience.
          </p>
        </div>

        {/* FEATURES */}
        <div
          className="
            mt-16

            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3

            gap-6
          "
        >
          {features.map((feature) => {

            const Icon =
              feature.icon;

            return (
              <div
                key={feature.title}
                className="
                  bg-white

                  border
                  border-border

                  rounded-[32px]

                  p-8
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
                  <Icon
                    size={24}
                  />
                </div>

                <h3
                  className="
                    mt-6

                    text-xl

                    font-semibold

                    text-primary
                  "
                >
                  {feature.title}
                </h3>

                <p
                  className="
                    mt-4

                    text-muted
                    leading-7
                  "
                >
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

export default FeaturesSection;