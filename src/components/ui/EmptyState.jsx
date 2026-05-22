function EmptyState({
  title = "No data found",
  description = "There is nothing to display right now.",
  action,
}) {

  return (
    <div
      className="
        bg-white
        border
        border-border
        rounded-3xl
        px-8
        py-16
        text-center
      "
    >

      {/* TITLE */}
      <h3
        className="
          text-2xl
          font-semibold
          text-primary
        "
      >
        {title}
      </h3>

      {/* DESCRIPTION */}
      <p
        className="
          mt-4
          text-muted
          leading-7
          max-w-md
          mx-auto
        "
      >
        {description}
      </p>

      {/* ACTION */}
      {action && (
        <div className="mt-8">
          {action}
        </div>
      )}

    </div>
  );
}

export default EmptyState;