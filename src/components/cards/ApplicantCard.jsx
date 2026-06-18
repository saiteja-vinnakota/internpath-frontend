import {
  User2,
  GraduationCap,
  MapPin,
  ExternalLink,
  GitBranch,
  Link2,
  Sparkles,
  CalendarDays,
} from "lucide-react";

import Button from "../ui/Button";

import ApplicationStatusBadge from "../application/ApplicationStatusBadge";

import { APPLICATION_STATUS } from "../../constants/applicationStatus";

import MatchScoreBar from "../ai/MatchScoreBar";

function ApplicantCard({
  application,

  onStatusUpdate,
}) {
  const {
    _id,

    status,

    student,

    matchScore,

    matchedSkills,

    createdAt,
  } = application;

  // PRIMARY ACTION BUTTON
  const primaryActionClass = `
      rounded-2xl
      bg-primary
      hover:bg-primary/90
      text-white
      min-w-[170px]
      justify-center
    `;

  // REJECT BUTTON
  const rejectActionClass = `
      rounded-2xl
      bg-red-500
      hover:bg-red-600
      text-white
      min-w-[120px]
      justify-center
    `;

  // PIPELINE ACTIONS
  const renderActions = () => {
    // APPLIED
    if (status === APPLICATION_STATUS.APPLIED) {
      return (
        <>
          <Button
            onClick={() =>
              onStatusUpdate(
                _id,

                APPLICATION_STATUS.SHORTLISTED,
              )
            }
            className={primaryActionClass}
          >
            Shortlist
          </Button>

          <Button
            onClick={() =>
              onStatusUpdate(
                _id,

                APPLICATION_STATUS.REJECTED,
              )
            }
            className={rejectActionClass}
          >
            Reject
          </Button>
        </>
      );
    }

    // SHORTLISTED
    if (status === APPLICATION_STATUS.SHORTLISTED) {
      return (
        <>
          <Button
            onClick={() =>
              onStatusUpdate(
                _id,

                APPLICATION_STATUS.INTERVIEW,
              )
            }
            className={primaryActionClass}
          >
            Start Interview
          </Button>

          <Button
            onClick={() =>
              onStatusUpdate(
                _id,

                APPLICATION_STATUS.REJECTED,
              )
            }
            className={rejectActionClass}
          >
            Reject
          </Button>
        </>
      );
    }

    // INTERVIEW
    if (status === APPLICATION_STATUS.INTERVIEW) {
      return (
        <>
          <Button
            onClick={() =>
              onStatusUpdate(
                _id,

                APPLICATION_STATUS.SELECTED,
              )
            }
            className={primaryActionClass}
          >
            Select Candidate
          </Button>

          <Button
            onClick={() =>
              onStatusUpdate(
                _id,

                APPLICATION_STATUS.REJECTED,
              )
            }
            className={rejectActionClass}
          >
            Reject
          </Button>
        </>
      );
    }

    // FINAL STATES
    return (
      <div
        className="
            text-sm
            font-medium
            text-muted
          "
      >
        No further actions
      </div>
    );
  };

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
          gap-5
        "
      >
        {/* LEFT */}
        <div
          className="
            flex
            items-start
            gap-4
            flex-1
          "
        >
          {/* AVATAR */}
          <div
            className="
              w-14
              h-14
              rounded-[22px]
              bg-stone
              flex
              items-center
              justify-center
              shrink-0
            "
          >
            <User2
              size={24}
              className="
                text-primary
              "
            />
          </div>

          {/* INFO */}
          <div className="flex-1">
            {/* NAME + STATUS */}
            <div
              className="
                flex
                items-center
                gap-3
                flex-wrap
              "
            >
              <h2
                className="
                  text-2xl
                  font-semibold
                  text-primary
                "
              >
                {student?.name}
              </h2>

              <ApplicationStatusBadge status={status} />
            </div>

            {/* EMAIL */}
            <p
              className="
                mt-1
                text-sm
                text-muted
              "
            >
              {student?.email}
            </p>

            {(!student?.college ||
              !student?.location ||
              !student?.github ||
              !student?.linkedin) && (
              <div
                className="
                    mt-3
                    inline-flex
                    items-center
                    rounded-full
                    bg-amber-50
                    px-3
                    py-1
                    text-xs
                    font-medium
                    text-amber-700
                  "
              >
                Profile Incomplete
              </div>
            )}

            {/* META */}
            <div
              className="
                mt-4
                flex
                flex-wrap
                gap-5
                text-sm
                text-muted
              "
            >
              {/* COLLEGE */}
              <div
                className="
                  flex
                  items-center
                  gap-2
                "
              >
                <GraduationCap size={16} />

                <span>{student?.college || "College not added"}</span>
              </div>

              {/* LOCATION */}
              <div
                className="
                  flex
                  items-center
                  gap-2
                "
              >
                <MapPin size={16} />

                <span>{student?.location || "Location not added"}</span>
              </div>

              {/* DATE */}
              <div
                className="
                  flex
                  items-center
                  gap-2
                "
              >
                <CalendarDays size={16} />

                <span>
                  Applied on {new Date(createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI SCORE */}
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
        {/* TOP */}
        <div
          className="
            flex
            items-center
            justify-between
            gap-4
            flex-wrap
          "
        >
          {/* LEFT */}
          <div
            className="
              flex
              items-center
              gap-4
            "
          >
            <div
              className="
                w-12
                h-12
                rounded-2xl
                bg-blue-50
                flex
                items-center
                justify-center
                text-accent
                shrink-0
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
                  text-3xl
                  font-semibold
                  text-primary
                "
              >
                {matchScore || 0}%
              </h3>
            </div>
          </div>

          {/* SCORE STATUS */}
          <div
            className={`
              px-4
              py-2
              rounded-full
              text-sm
              font-semibold

              ${
                matchScore >= 85
                  ? `
                    bg-green-50
                    text-green-700
                  `
                  : matchScore >= 70
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
            {matchScore >= 85
              ? "Excellent Match"
              : matchScore >= 70
                ? "Strong Match"
                : "Moderate Match"}
          </div>
        </div>

        {/* BAR */}
        <div className="mt-5">
          <MatchScoreBar score={matchScore || 0} />
        </div>
      </div>

      {/* SKILLS */}
      {matchedSkills?.length > 0 && (
        <div className="mt-7">
          <p
            className="
              text-sm
              font-medium
              text-primary
            "
          >
            Matching Skills
          </p>

          <div
            className="
              mt-4
              flex
              flex-wrap
              gap-3
            "
          >
            {matchedSkills.slice(0, 6).map((skill) => (
              <div
                key={skill}
                className="
                    px-4
                    py-2
                    rounded-full
                    bg-blue-50
                    text-accent
                    text-sm
                    font-medium
                  "
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      )}
      {student?.skills?.length > 0 && (
        <div className="mt-6">
          <p
            className="
              text-sm
              font-medium
              text-primary
            "
          >
            Student Skills
          </p>

          <div
            className="
              mt-4
              flex
              flex-wrap
              gap-3
            "
          >
            {student.skills.slice(0, 8).map((skill) => (
              <div
                key={skill}
                className="
                    px-4
                    py-2
                    rounded-full
                    bg-stone
                    text-sm
                    text-primary
                  "
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BIO */}
      {student?.bio && (
        <p
          className="
            mt-7
            text-muted
            leading-7
          "
        >
          {student.bio}
        </p>
      )}

      {/* FOOTER */}
      <div
        className="
          mt-8
          pt-6
          border-t
          border-border
          flex
          flex-col
          xl:flex-row
          xl:items-center
          xl:justify-between
          gap-5
        "
      >
        {/* LINKS */}
        <div
          className="
            flex
            flex-wrap
            items-center
            gap-3
          "
        >
          {/* RESUME */}
          {student?.resumeUrl && (
            <a href={student.resumeUrl} target="_blank" rel="noreferrer">
              <Button className=" rounded-2xl ">
                <ExternalLink size={16} />
                View Resume
              </Button>
            </a>
          )}

          {/* GITHUB */}
          {student?.github && (
            <a href={student.github} target="_blank" rel="noreferrer">
              <Button
                variant="secondary"
                className="
                  rounded-2xl
                "
              >
                <GitBranch size={16} />
                GitHub
              </Button>
            </a>
          )}

          {/* LINKEDIN */}
          {student?.linkedin && (
            <a href={student.linkedin} target="_blank" rel="noreferrer">
              <Button
                variant="secondary"
                className="
                  rounded-2xl
                "
              >
                <Link2 size={16} />
                LinkedIn
              </Button>
            </a>
          )}
        </div>

        {/* ACTIONS */}
        <div
          className="
            flex
            flex-wrap
            items-center
            gap-3
          "
        >
          {renderActions()}
        </div>
      </div>
    </div>
  );
}

export default ApplicantCard;
