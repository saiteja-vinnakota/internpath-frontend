import {
  Building2,
  MapPin,
  BriefcaseBusiness,
  CalendarDays,
  IndianRupee,
  Clock3,
  Sparkles,
} from "lucide-react";

import { Link } from "react-router-dom";

import ApplicationStatusBadge from "../application/ApplicationStatusBadge";

import Button from "../ui/Button";

function ApplicationCard({ application }) {
  const { job, status, createdAt, matchScore } = application;

  return (
    <div
      className="
        bg-white
        border
        border-border
        rounded-[32px]
        p-7
        transition-shadow
        duration-200
        hover:shadow-md
      "
    >
      {/* HEADER */}
      <div
        className="
          flex
          items-start
          justify-between
          gap-4
        "
      >
        {/* LEFT */}
        <div className="flex-1">
          {/* COMPANY + CATEGORY */}
          <div
            className="
              flex
              items-center
              gap-3
              flex-wrap
            "
          >
            <div
              className="
                inline-flex
                items-center
                gap-2
                px-4
                py-2
                rounded-full
                bg-stone
                text-sm
                text-muted
              "
            >
              <Building2 size={16} />

              <span>{job?.company}</span>
            </div>

            {job?.category && (
              <div
                className="
                  px-3
                  py-1
                  rounded-full
                  bg-blue-50
                  text-accent
                  text-xs
                  font-medium
                "
              >
                {job.category === "fullstack"
                  ? "Full Stack"
                  : job.category === "aiml"
                    ? "AI/ML"
                    : job.category === "datascience"
                      ? "Data Science"
                      : job.category}
              </div>
            )}
          </div>

          {/* TITLE */}
          <h2
            className="
              mt-4
              text-2xl
              font-semibold
              leading-tight
              text-primary
            "
          >
            {job?.title}
          </h2>
        </div>

        {job?.deadline && new Date(job.deadline) < new Date() && (
          <div
            className="
              mt-4
              inline-flex
              items-center
              rounded-full
              bg-red-50
              px-3
              py-1
              text-xs
              font-medium
              text-red-600
            "
          >
            Applications Closed
          </div>
        )}

        {/* STATUS */}
        <div
          className="
            flex
            flex-col
            items-end
            gap-2
          "
        >
          <p
            className="
              text-xs
              font-medium
              uppercase
              tracking-wide
              text-muted
            "
          >
            Current Stage
          </p>

          <ApplicationStatusBadge status={status} />
        </div>
      </div>

      {/* META */}
      <div
        className="
          mt-7
          flex
          flex-wrap
          gap-5
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
          <MapPin size={18} />

          <span>{job?.location}</span>
        </div>

        {/* MODE */}
        <div
          className="
            flex
            items-center
            gap-2
          "
        >
          <BriefcaseBusiness size={18} />

          <span
            className="
              capitalize
            "
          >
            {job?.mode}
          </span>
        </div>

        {/* DURATION */}
        {job?.duration && (
          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <Clock3 size={18} />

            <span>{job.duration}</span>
          </div>
        )}
      </div>

      {/* APPLICATION INSIGHTS */}
      <div
        className="
          mt-8
          p-5
          rounded-[28px]
          bg-stone
          border
          border-border
        "
      >
        <div
          className="
            flex
            flex-wrap
            items-center
            justify-between
            gap-5
          "
        >
          {/* LEFT */}
          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <div
              className="
                w-11
                h-11
                rounded-2xl
                bg-blue-50
                flex
                items-center
                justify-center
                text-accent
              "
            >
              <Sparkles size={20} />
            </div>

            <div>
              <p
                className="
                  text-sm
                  text-muted
                "
              >
                AI Match Score
              </p>

              <h3
                className="
                  mt-1
                  text-2xl
                  font-semibold
                  text-primary
                "
              >
                {matchScore || 0}%
              </h3>
            </div>
          </div>

          {/* MATCH QUALITY */}
          <div
            className={`
              px-4
              py-2
              rounded-full
              text-sm
              font-semibold

              ${
                (matchScore || 0) >= 85
                  ? `
                  bg-green-50
                  text-green-700
                `
                  : (matchScore || 0) >= 70
                    ? `
                  bg-blue-50
                  text-blue-700
                `
                    : `
                  bg-amber-50
                  text-amber-700
                `
              }
            `}
          >
            {(matchScore || 0) >= 85
              ? "Excellent Match"
              : (matchScore || 0) >= 70
                ? "Strong Match"
                : "Moderate Match"}
          </div>
        </div>

        {/* PROGRESS */}
        <div
          className="
            mt-5
            h-3
            rounded-full
            bg-border
            overflow-hidden
          "
        >
          <div
            className={`
              h-full
              rounded-full
              transition-all
              duration-500

              ${
                (matchScore || 0) >= 85
                  ? "bg-green-500"
                  : (matchScore || 0) >= 70
                    ? "bg-blue-500"
                    : "bg-amber-500"
              }
            `}
            style={{
              width: `${matchScore || 0}%`,
            }}
          />
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
          flex-col
          md:flex-row
          md:items-center
          md:justify-between
          gap-5
        "
      >
        {/* LEFT */}
        <div
          className="
            flex
            flex-wrap
            items-center
            gap-5
          "
        >
          {/* STIPEND */}
          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <IndianRupee
              size={18}
              className="
                text-primary
              "
            />

            <div>
              <p
                className="
                  text-xs
                  text-muted
                "
              >
                Stipend
              </p>

              <p
                className="
                  text-base
                  font-semibold
                  text-primary
                "
              >
                {job?.stipend ? `₹${job.stipend}/month` : "Unpaid"}
              </p>
            </div>
          </div>

          {/* APPLIED DATE */}
          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <CalendarDays
              size={18}
              className="
                text-primary
              "
            />

            <div>
              <p
                className="
                  text-xs
                  text-muted
                "
              >
                Applied On
              </p>

              <p
                className="
                  text-base
                  font-medium
                  text-primary
                "
              >
                {new Date(createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {job?.deadline && (
            <div
              className="
                flex
                items-center
                gap-2
              "
            >
              <CalendarDays
                size={18}
                className="
                  text-primary
                "
              />

              <div>
                <p
                  className="
                    text-xs
                    text-muted
                  "
                >
                  Deadline
                </p>

                <p
                  className="
                    text-base
                    font-medium
                    text-primary
                  "
                >
                  {new Date(job.deadline).toLocaleDateString()}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ACTION */}
        <Link to={`/jobs/${job?._id}`}>
          <Button
            variant="secondary"
            className="
              rounded-2xl
            "
          >
            View Job
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default ApplicationCard;
