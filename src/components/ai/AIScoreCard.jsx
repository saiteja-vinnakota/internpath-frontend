import {
  Sparkles,
  Trophy,
  TrendingUp,
} from "lucide-react";

function AIScoreCard({
  score = 0,
}) {

  // LABEL
  const label =

    score >= 85

      ? "Excellent Match"

      : score >= 70

      ? "Strong Match"

      : score >= 50

      ? "Moderate Match"

      : "Low Match";

  // COLORS
  const scoreStyles =

    score >= 85

      ? `
        bg-green-50
        text-green-700
      `

      : score >= 70

      ? `
        bg-blue-50
        text-blue-700
      `

      : score >= 50

      ? `
        bg-amber-50
        text-amber-700
      `

      : `
        bg-red-50
        text-red-700
      `;

  return (
    <div
      className="
        bg-white
        border
        border-border
        rounded-[36px]
        p-8
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
              font-medium
            "
          >

            <Sparkles
              size={16}
            />

            AI Analysis

          </div>

          <h2
            className="
              mt-5
              text-5xl
              font-bold
              text-primary
              leading-none
            "
          >

            {score}%

          </h2>

          <p
            className="
              mt-3
              text-muted
              leading-7
            "
          >

            Your profile alignment
            with this internship role.

          </p>

        </div>

        {/* STATUS */}
        <div
          className={`
            px-5
            py-3
            rounded-2xl
            text-sm
            font-semibold

            ${scoreStyles}
          `}
        >

          {label}

        </div>

      </div>

      {/* PROGRESS */}
      <div className="mt-10">

        <div
          className="
            h-4
            rounded-full
            bg-stone
            overflow-hidden
          "
        >

          <div
            className={`
              h-full
              rounded-full

              ${
                score >= 85

                  ? "bg-green-500"

                  : score >= 70

                  ? "bg-blue-500"

                  : score >= 50

                  ? "bg-amber-500"

                  : "bg-red-500"
              }
            `}
            style={{
              width: `${score}%`,
            }}
          />

        </div>

      </div>

      {/* METRICS */}
      <div
        className="
          mt-10
          grid
          grid-cols-2
          gap-5
        "
      >

        {/* ATS */}
        <div
          className="
            p-5
            rounded-[28px]
            bg-stone
            border
            border-border
          "
        >

          <div
            className="
              w-11
              h-11
              rounded-2xl
              bg-green-50
              text-green-700
              flex
              items-center
              justify-center
            "
          >

            <Trophy
              size={20}
            />

          </div>

          <p
            className="
              mt-5
              text-sm
              text-muted
            "
          >
            ATS Compatibility
          </p>

          <h3
            className="
              mt-2
              text-2xl
              font-semibold
              text-primary
            "
          >

            {Math.min(
              score + 5,
              100
            )}
            %

          </h3>

        </div>

        {/* TREND */}
        <div
          className="
            p-5
            rounded-[28px]
            bg-stone
            border
            border-border
          "
        >

          <div
            className="
              w-11
              h-11
              rounded-2xl
              bg-blue-50
              text-blue-700
              flex
              items-center
              justify-center
            "
          >

            <TrendingUp
              size={20}
            />

          </div>

          <p
            className="
              mt-5
              text-sm
              text-muted
            "
          >
            Hiring Potential
          </p>

          <h3
            className="
              mt-2
              text-2xl
              font-semibold
              text-primary
            "
          >

            {score >= 85

              ? "High"

              : score >= 70

              ? "Good"

              : score >= 50

              ? "Average"

              : "Low"}

          </h3>

        </div>

      </div>

    </div>
  );
}

export default AIScoreCard;