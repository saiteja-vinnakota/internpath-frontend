import { Link }
from "react-router-dom";

function AuthLayout({
  title,
  subtitle,
  children,
}) {

  return (
    <div
      className="
        min-h-screen
        bg-stone
        flex
        items-center
        justify-center
        px-4
        py-10
      "
    >

      <div
        className="
          w-full
          max-w-md
        "
      >

        {/* LOGO */}
        <Link
          to="/"
          className="
            flex
            items-center
            justify-center
            gap-3
            mb-10
          "
        >

          <div
            className="
              w-10
              h-10
              rounded-xl
              bg-primary
              flex
              items-center
              justify-center
            "
          >

            <svg
              viewBox="0 0 18 18"
              className="w-5 h-5"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M3 14l3-4 3 2 3-5 3 4" />

              <circle
                cx="9"
                cy="4"
                r="1.5"
              />
            </svg>

          </div>

          <h1
            className="
              font-serif
              text-3xl
              text-primary
            "
          >
            InternPath
          </h1>

        </Link>

        {/* CARD */}
        <div
          className="
            bg-white
            border
            border-border
            rounded-[32px]
            p-8
            shadow-soft
          "
        >

          {/* HEADER */}
          <div className="text-center">

            <h2
              className="
                text-3xl
                font-semibold
                text-primary
              "
            >
              {title}
            </h2>

            {subtitle && (
              <p
                className="
                  mt-3
                  text-muted
                  leading-7
                "
              >
                {subtitle}
              </p>
            )}

          </div>

          {/* CONTENT */}
          <div className="mt-8">
            {children}
          </div>

        </div>

      </div>

    </div>
  );
}

export default AuthLayout;