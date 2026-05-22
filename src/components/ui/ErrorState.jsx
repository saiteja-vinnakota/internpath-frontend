function ErrorState({
  title = "Something went wrong",
  description =
    "An unexpected error occurred. Please try again.",
  action,
}) {

  return (
    <div
      className="
        bg-white
        border
        border-red-100
        rounded-3xl
        px-8
        py-16
        text-center
      "
    >

      {/* ICON */}
      <div
        className="
          w-16
          h-16
          mx-auto
          rounded-2xl
          bg-red-50
          flex
          items-center
          justify-center
          text-red-500
          text-2xl
          font-bold
        "
      >
        !
      </div>

      {/* TITLE */}
      <h3
        className="
          mt-6
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

export default ErrorState;