import {
  CheckCircle2,
  CircleDashed,
  Sparkles,
  TrendingUp,
} from "lucide-react";

function MatchBreakdown({

  matchedSkills = [],

  missingSkills = [],

  suggestion = "",

}) {

  // MATCH PERCENT
  const totalSkills =

    matchedSkills.length +
    missingSkills.length;

  const matchPercent =

    totalSkills > 0

      ? Math.round(

          (matchedSkills.length /
            totalSkills) * 100
        )

      : 0;

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

      {/* HEADER */}
      <div
        className="
          flex
          items-start
          justify-between
          gap-5
          flex-wrap
        "
      >

        {/* LEFT */}
        <div>

          <div
            className="
              inline-flex
              items-center
              gap-2
              px-4
              py-2
              rounded-full
              bg-blue-50
              text-accent
              text-sm
              font-semibold
            "
          >

            <Sparkles
              size={16}
            />

            <span>
              AI Skill Analysis
            </span>

          </div>

          <h2
            className="
              mt-5
              text-3xl
              font-semibold
              text-primary
            "
          >
            Match Breakdown
          </h2>

          <p
            className="
              mt-2
              text-muted
              leading-7
            "
          >
            AI analyzed your profile
            against internship
            requirements.
          </p>

        </div>

        {/* SCORE */}
        <div
          className="
            w-28
            h-28
            rounded-[32px]
            bg-stone
            border
            border-border
            flex
            flex-col
            items-center
            justify-center
            shrink-0
          "
        >

          <span
            className="
              text-3xl
              font-semibold
              text-primary
            "
          >
            {matchPercent}%
          </span>

          <span
            className="
              mt-1
              text-sm
              text-muted
            "
          >
            Match
          </span>

        </div>

      </div>

      {/* SKILL SECTIONS */}
      <div
        className="
          mt-8
          grid
          grid-cols-1
          xl:grid-cols-2
          gap-6
        "
      >

        {/* MATCHED */}
        <div
          className="
            p-6
            rounded-[28px]
            bg-stone
            border
            border-border
          "
        >

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
                bg-green-50
                flex
                items-center
                justify-center
                text-green-700
              "
            >

              <CheckCircle2
                size={20}
              />

            </div>

            <div>

              <h3
                className="
                  text-xl
                  font-semibold
                  text-primary
                "
              >
                Matching Skills
              </h3>

              <p
                className="
                  text-sm
                  text-muted
                "
              >

                {matchedSkills.length} matched skills

              </p>

            </div>

          </div>

          <div
            className="
              mt-6
              flex
              flex-wrap
              gap-3
            "
          >

            {matchedSkills.length > 0 ? (

              matchedSkills.map(
                (skill) => (

                  <div
                    key={skill}
                    className="
                      px-4
                      py-2
                      rounded-full
                      bg-green-50
                      text-green-700
                      text-sm
                      font-medium
                    "
                  >
                    {skill}
                  </div>

                )
              )

            ) : (

              <p
                className="
                  text-sm
                  text-muted
                "
              >
                No matching skills detected.
              </p>

            )}

          </div>

        </div>

        {/* MISSING */}
        <div
          className="
            p-6
            rounded-[28px]
            bg-stone
            border
            border-border
          "
        >

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
                bg-amber-50
                flex
                items-center
                justify-center
                text-amber-700
              "
            >

              <CircleDashed
                size={20}
              />

            </div>

            <div>

              <h3
                className="
                  text-xl
                  font-semibold
                  text-primary
                "
              >
                Missing Skills
              </h3>

              <p
                className="
                  text-sm
                  text-muted
                "
              >

                {missingSkills.length} missing skills

              </p>

            </div>

          </div>

          <div
            className="
              mt-6
              flex
              flex-wrap
              gap-3
            "
          >

            {missingSkills.length > 0 ? (

              missingSkills.map(
                (skill) => (

                  <div
                    key={skill}
                    className="
                      px-4
                      py-2
                      rounded-full
                      bg-amber-50
                      text-amber-700
                      text-sm
                      font-medium
                    "
                  >
                    {skill}
                  </div>

                )
              )

            ) : (

              <p
                className="
                  text-sm
                  text-muted
                "
              >
                No missing skills detected.
              </p>

            )}

          </div>

        </div>

      </div>

      {/* AI SUGGESTION */}
      {suggestion && (

        <div
          className="
            mt-8
            p-6
            rounded-[28px]
            bg-blue-50
            border
            border-blue-100
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
                w-11
                h-11
                rounded-2xl
                bg-white
                flex
                items-center
                justify-center
                text-accent
                shrink-0
              "
            >

              <TrendingUp
                size={20}
              />

            </div>

            <div>

              <h3
                className="
                  text-xl
                  font-semibold
                  text-primary
                "
              >
                AI Improvement Suggestion
              </h3>

              <p
                className="
                  mt-3
                  text-muted
                  leading-7
                "
              >
                {suggestion}
              </p>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default MatchBreakdown;