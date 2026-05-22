import {
  Mail,
  GraduationCap,
  Sparkles,
} from "lucide-react";

import Avatar from "../ui/Avatar";

import Badge from "../ui/Badge";

function ApplicantCard({
  applicant,
}) {

  return (
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

        {/* PROFILE */}
        <div
          className="
            flex
            items-center
            gap-4
          "
        >

          <Avatar
            src={applicant.profilePic}
            alt={applicant.name}
            size="lg"
          />

          <div>

            <h2
              className="
                text-2xl
                font-semibold
                text-primary
              "
            >
              {applicant.name}
            </h2>

            <div
              className="
                mt-2
                flex
                items-center
                gap-2
                text-muted
                text-sm
              "
            >

              <Mail size={16} />

              <span>
                {applicant.email}
              </span>

            </div>

          </div>

        </div>

        {/* MATCH SCORE */}
        {applicant.matchScore && (
          <div
            className="
              min-w-[78px]
              h-[78px]
              rounded-2xl
              bg-blue-50
              flex
              flex-col
              items-center
              justify-center
            "
          >

            <span
              className="
                text-2xl
                font-bold
                text-accent
              "
            >
              {applicant.matchScore}%
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

      {/* EDUCATION */}
      <div
        className="
          mt-7
          flex
          items-center
          gap-3
          text-muted
        "
      >

        <GraduationCap size={18} />

        <span className="text-sm">
          {applicant.education ||
            "Computer Science Student"}
        </span>

      </div>

      {/* SKILLS */}
      <div
        className="
          mt-7
          flex
          flex-wrap
          gap-3
        "
      >

        {applicant.skills
          ?.slice(0, 5)
          .map((skill) => (

            <Badge key={skill}>
              {skill}
            </Badge>

          ))}

      </div>

      {/* AI INSIGHT */}
      <div
        className="
          mt-8
          p-5
          rounded-2xl
          bg-stone
          flex
          items-start
          gap-3
        "
      >

        <Sparkles
          size={20}
          className="
            text-accent
            mt-1
          "
        />

        <p
          className="
            text-sm
            text-muted
            leading-7
          "
        >
          Strong alignment with required
          frontend technologies and
          problem-solving skills.
        </p>

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
          Applied recently
        </p>

        <button
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
            hover:bg-black
          "
        >
          Review Applicant
        </button>

      </div>

    </div>
  );
}

export default ApplicantCard;