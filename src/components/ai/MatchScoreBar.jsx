function MatchScoreBar({
  score = 0,
}) {

  // BAR COLOR
  const barColor =

    score >= 85

      ? "bg-green-500"

      : score >= 70

      ? "bg-blue-500"

      : "bg-amber-500";

  return (
    <div>

      {/* TOP */}
      <div
        className="
          flex
          items-center
          justify-between
          mb-3
        "
      >

        <p
          className="
            text-sm
            text-muted
          "
        >
          Match Strength
        </p>

        <span
          className="
            text-sm
            font-semibold
            text-primary
          "
        >
          {score}%
        </span>

      </div>

      {/* TRACK */}
      <div
        className="
          h-3
          w-full
          rounded-full
          bg-border
          overflow-hidden
        "
      >

        {/* FILL */}
        <div
          className={`
            h-full
            rounded-full
            transition-all
            duration-500

            ${barColor}
          `}
          style={{
            width: `${score}%`,
          }}
        />

      </div>

    </div>
  );
}

export default MatchScoreBar;