import {
  Clock3,
  CheckCircle2,
  XCircle,
  BriefcaseBusiness,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

function ApplicationCard({
  application,
}) {

  const statusConfig = {

    pending: {
      icon: Clock3,
      color:
        "bg-yellow-50 text-yellow-600",
      label: "Pending",
    },

    shortlisted: {
      icon: CheckCircle2,
      color:
        "bg-blue-50 text-accent",
      label: "Shortlisted",
    },

    accepted: {
      icon: CheckCircle2,
      color:
        "bg-green-50 text-green-600",
      label: "Accepted",
    },

    rejected: {
      icon: XCircle,
      color:
        "bg-red-50 text-red-500",
      label: "Rejected",
    },
  };

  const currentStatus =
    statusConfig[
      application.status
    ] || statusConfig.pending;

  const StatusIcon =
    currentStatus.icon;

  return (
    <Link
      to={`/jobs/${application.job?._id}`}
      className="
        block
        group
      "
    >

      <div
        className="
          bg-white
          border
          border-border
          rounded-[32px]
          p-7
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-medium
        "
      >

        {/* TOP */}
        <div
          className="
            flex
            items-start
            justify-between
            gap-4
          "
        >

          {/* LEFT */}
          <div>

            <p
              className="
                text-sm
                text-muted
              "
            >
              {application.job?.company}
            </p>

            <h2
              className="
                mt-2
                text-2xl
                font-semibold
                text-primary
                group-hover:text-accent
                transition-colors
              "
            >
              {application.job?.title}
            </h2>

          </div>

          {/* STATUS */}
          <div
            className={`
              px-4
              py-2
              rounded-2xl
              flex
              items-center
              gap-2
              text-sm
              font-medium

              ${currentStatus.color}
            `}
          >

            <StatusIcon size={16} />

            <span>
              {currentStatus.label}
            </span>

          </div>

        </div>

        {/* MESSAGE */}
        <p
          className="
            mt-6
            text-muted
            leading-7
          "
        >
          Your application is currently
          under review by the recruiter.
        </p>

        {/* META */}
        <div
          className="
            mt-8
            flex
            flex-wrap
            items-center
            gap-5
            text-sm
            text-muted
          "
        >

          {/* TYPE */}
          <div
            className="
              flex
              items-center
              gap-2
            "
          >

            <BriefcaseBusiness size={16} />

            <span>
              {application.job?.type}
            </span>

          </div>

          {/* DATE */}
          <div
            className="
              flex
              items-center
              gap-2
            "
          >

            <Clock3 size={16} />

            <span>
              Applied on{" "}
              {new Date(
                application.createdAt
              ).toLocaleDateString()}
            </span>

          </div>

        </div>

        {/* FOOTER */}
        <div
          className="
            mt-8
            pt-5
            border-t
            border-border
            flex
            items-center
            justify-between
          "
        >

          <p
            className="
              text-sm
              text-muted
            "
          >
            Track your internship progress
          </p>

          <div
            className="
              text-sm
              font-medium
              text-primary
              group-hover:text-accent
              transition-colors
            "
          >
            View Details →
          </div>

        </div>

      </div>

    </Link>
  );
}

export default ApplicationCard;