import {
  Bookmark,
  MapPin,
  BriefcaseBusiness,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

import Badge from "../ui/Badge";

function SavedJobCard({
  job,
}) {

  const modeLabel =
    job.mode === "remote"

      ? "Remote"

      : job.mode === "hybrid"

      ? "Hybrid"

      : job.mode === "onsite"

      ? "On-site"

      : "Not specified";

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
          rounded-[28px]
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
                text-xl
                font-semibold
                text-primary
                group-hover:text-accent
                transition-colors
              "
            >
              {job.title}
            </h2>

          </div>

          {/* SAVE ICON */}
          <div
            className="
              w-11
              h-11
              rounded-2xl
              bg-blue-50
              flex
              items-center
              justify-center
            "
          >

            <Bookmark
              size={20}
              className="
                text-accent
                fill-accent
              "
            />

          </div>

        </div>

        {/* SKILLS */}
        <div
          className="
            mt-6
            flex
            flex-wrap
            gap-3
          "
        >

          {job.requiredSkills
            ?.slice(0, 3)
            .map((skill) => (

              <Badge key={skill}>
                {skill}
              </Badge>

            ))}

        </div>

        {/* META */}
        <div
          className="
            mt-7
            flex
            flex-wrap
            items-center
            gap-5
            text-sm
            text-muted
          "
        >

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

          <div
            className="
              flex
              items-center
              gap-2
            "
          >

            <BriefcaseBusiness size={16} />

            <span>
              {modeLabel}
            </span>

          </div>

        </div>

      </div>

    </Link>
  );
}

export default SavedJobCard;
