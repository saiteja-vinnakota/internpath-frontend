import {
  MapPin,
  BriefcaseBusiness,
  Clock3,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

import Badge from "../ui/Badge";

function JobCard({
  job,
}) {

  return (
    <Link
      to={`/jobs/${job._id}`}
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
          p-6
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

          {/* COMPANY + TITLE */}
          <div>

            <p
              className="
                text-sm
                text-muted
              "
            >
              {job.company}
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
              {job.title}
            </h2>

          </div>

          {/* AI SCORE */}
          {job.matchScore && (
            <div
              className="
                min-w-[72px]
                h-[72px]
                rounded-2xl
                bg-blue-50
                flex
                items-center
                justify-center
                flex-col
              "
            >

              <span
                className="
                  text-xl
                  font-bold
                  text-accent
                "
              >
                {job.matchScore}%
              </span>

              <span
                className="
                  text-xs
                  text-muted
                "
              >
                Match
              </span>

            </div>
          )}

        </div>

        {/* DESCRIPTION */}
        <p
          className="
            mt-6
            text-muted
            leading-7
            line-clamp-3
          "
        >
          {job.description}
        </p>

        {/* TAGS */}
        <div
          className="
            mt-6
            flex
            flex-wrap
            gap-3
          "
        >

          {job.requiredSkills
            ?.slice(0, 4)
            .map((skill) => (

              <Badge key={skill}>
                {skill}
              </Badge>

            ))}

        </div>

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

          {/* LOCATION */}
          <div
            className="
              flex
              items-center
              gap-2
            "
          >

            <MapPin size={16} />

            <span>
              {job.location || "Remote"}
            </span>

          </div>

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
              {job.type}
            </span>

          </div>

          {/* DEADLINE */}
          <div
            className="
              flex
              items-center
              gap-2
            "
          >

            <Clock3 size={16} />

            <span>
              Apply before{" "}
              {new Date(
                job.applicationDeadline
              ).toLocaleDateString()}
            </span>

          </div>

        </div>

        {/* FOOTER */}
        <div
          className="
            mt-8
            pt-6
            border-t
            border-border
            flex
            items-center
            justify-between
          "
        >

          {/* STIPEND */}
          <div>

            <p
              className="
                text-sm
                text-muted
              "
            >
              Stipend
            </p>

            <h3
              className="
                mt-1
                text-xl
                font-semibold
                text-primary
              "
            >
              ₹
              {job.stipend || "Unpaid"}
            </h3>

          </div>

          {/* APPLY */}
          <div
            className="
              px-5
              py-3
              rounded-2xl
              bg-primary
              text-white
              text-sm
              font-medium
              transition-all
              duration-200
              group-hover:bg-black
            "
          >
            View Details
          </div>

        </div>

      </div>

    </Link>
  );
}

export default JobCard;