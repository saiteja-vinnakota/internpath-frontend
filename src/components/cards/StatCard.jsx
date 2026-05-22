function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  trendLabel,
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

        {/* TITLE */}
        <div>

          <p
            className="
              text-sm
              text-muted
            "
          >
            {title}
          </p>

          <h2
            className="
              mt-4
              text-4xl
              font-semibold
              text-primary
            "
          >
            {value}
          </h2>

        </div>

        {/* ICON */}
        {Icon && (
          <div
            className="
              w-14
              h-14
              rounded-2xl
              bg-stone
              flex
              items-center
              justify-center
            "
          >

            <Icon
              size={28}
              className="text-primary"
            />

          </div>
        )}

      </div>

      {/* TREND */}
      {(trend || trendLabel) && (
        <div
          className="
            mt-8
            pt-5
            border-t
            border-border
            flex
            items-center
            gap-3
          "
        >

          {trend && (
            <span
              className="
                px-3
                py-1.5
                rounded-full
                bg-green-50
                text-green-600
                text-xs
                font-medium
              "
            >
              {trend}
            </span>
          )}

          {trendLabel && (
            <p
              className="
                text-sm
                text-muted
              "
            >
              {trendLabel}
            </p>
          )}

        </div>
      )}

    </div>
  );
}

export default StatCard;