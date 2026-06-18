import {
  Sparkles,
} from "lucide-react";

function MatchScoreBadge({
  score = 0,
}) {

  // STYLES
  const badgeStyles =

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

      : `
        bg-amber-50
        text-amber-700
      `;

  // LABEL
  const label =

    score >= 85

      ? "Excellent"

      : score >= 70

      ? "Strong"

      : "Moderate";

  return (
    <div
      className={`
        inline-flex
        items-center
        gap-2
        px-4
        py-2
        rounded-full
        text-sm
        font-semibold

        ${badgeStyles}
      `}
    >

      <Sparkles
        size={16}
      />

      <span>
        {score}% Match
      </span>

      <div
        className="
          w-1
          h-1
          rounded-full
          bg-current
          opacity-50
        "
      />

      <span>
        {label}
      </span>

    </div>
  );
}

export default MatchScoreBadge;