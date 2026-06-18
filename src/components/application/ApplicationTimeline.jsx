import {
  CheckCircle2,
  Clock3,
  Search,
  MessageSquareText,
  XCircle,
} from "lucide-react";

import {
  APPLICATION_STATUS,
} from "../../constants/applicationStatus";

function ApplicationTimeline({
  status,
}) {

  const timelineSteps = [

    {
      key:
        APPLICATION_STATUS.APPLIED,

      label:
        "Applied",

      description:
        "Your application has been submitted.",

      icon: Clock3,
    },

    {
      key:
        APPLICATION_STATUS.SHORTLISTED,

      label:
        "Shortlisted",

      description:
        "Your profile passed initial screening.",

      icon: Search,
    },

    {
      key:
        APPLICATION_STATUS.INTERVIEW,

      label:
        "Interview",

      description:
        "Recruiter moved you to interview stage.",

      icon:
        MessageSquareText,
    },

    {
      key:
        APPLICATION_STATUS.SELECTED,

      label:
        "Selected",

      description:
        "Congratulations! You were selected.",

      icon:
        CheckCircle2,
    },
  ];

  // REJECTED FLOW
  if (
    status ===
    APPLICATION_STATUS.REJECTED
  ) {

    return (
      <div
        className="
          bg-white
          border
          border-border
          rounded-[32px]
          p-7
        "
      >

        <div
          className="
            flex
            items-start
            gap-4
          "
        >

          <div
            className="
              w-14
              h-14
              rounded-[22px]
              bg-red-50
              text-red-500
              flex
              items-center
              justify-center
              shrink-0
            "
          >

            <XCircle
              size={28}
            />

          </div>

          <div>

            <h3
              className="
                text-2xl
                font-semibold
                text-primary
              "
            >
              Application Rejected
            </h3>

            <p
              className="
                mt-2
                text-muted
                leading-7
              "
            >
              This application was not selected
              for the next stage. Continue applying
              to other opportunities.
            </p>

          </div>

        </div>

      </div>
    );
  }

  // CURRENT STEP
  const currentIndex =
    timelineSteps.findIndex(
      (step) =>
        step.key === status
    );

  return (
    <div
      className="
        bg-white
        border
        border-border
        rounded-[32px]
        p-7
      "
    >

      <h2
        className="
          text-2xl
          font-semibold
          text-primary
        "
      >
        Application Progress
      </h2>

      <div className="mt-8 space-y-8">

        {timelineSteps.map(
          (
            step,
            index
          ) => {

            const isCompleted =
              index <=
              currentIndex;

            const Icon =
              step.icon;

            return (
              <div
                key={step.key}
                className="
                  flex
                  items-start
                  gap-5
                "
              >

                {/* ICON */}
                <div
                  className={`
                    relative
                    w-14
                    h-14
                    rounded-[22px]
                    flex
                    items-center
                    justify-center
                    shrink-0

                    ${isCompleted

                      ? `
                        bg-blue-50
                        text-accent
                      `

                      : `
                        bg-stone
                        text-muted
                      `
                    }
                  `}
                >

                  <Icon
                    size={24}
                  />

                  {/* LINE */}
                  {index !==
                    timelineSteps.length - 1 && (

                    <div
                      className={`
                        absolute
                        top-[56px]
                        left-1/2
                        -translate-x-1/2
                        w-[2px]
                        h-10

                        ${index <
                          currentIndex

                          ? "bg-accent"

                          : "bg-border"
                        }
                      `}
                    />

                  )}

                </div>

                {/* CONTENT */}
                <div className="pt-1">

                  <h3
                    className={`
                      text-lg
                      font-semibold

                      ${isCompleted

                        ? "text-primary"

                        : "text-muted"
                      }
                    `}
                  >
                    {step.label}
                  </h3>

                  <p
                    className="
                      mt-1
                      text-muted
                      leading-7
                    "
                  >
                    {step.description}
                  </p>

                </div>

              </div>
            );
          }
        )}

      </div>

    </div>
  );
}

export default ApplicationTimeline;