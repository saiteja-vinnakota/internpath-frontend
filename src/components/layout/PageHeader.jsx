function PageHeader({
  title,
  description,
  action,
}) {

  return (
    <div
      className="
        flex
        flex-col
        lg:flex-row
        lg:items-center
        lg:justify-between
        gap-6
        mb-10
      "
    >

      {/* LEFT CONTENT */}
      <div>

        {/* TITLE */}
        <h1
          className="
            font-serif
            text-4xl
            md:text-5xl
            leading-tight
            text-primary
          "
        >
          {title}
        </h1>

        {/* DESCRIPTION */}
        {description && (
          <p
            className="
              mt-4
              text-lg
              leading-8
              text-muted
              max-w-2xl
            "
          >
            {description}
          </p>
        )}

      </div>

      {/* RIGHT ACTION */}
      {action && (
        <div
          className="
            flex
            items-center
            gap-4
            flex-wrap
          "
        >
          {action}
        </div>
      )}

    </div>
  );
}

export default PageHeader;