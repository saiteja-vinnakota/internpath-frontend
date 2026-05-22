function AuthLayout({ children }) {
  return (
    <div className="
      min-h-screen
      grid
      lg:grid-cols-2
    ">

      {/* LEFT SIDE */}
      <div className="
        hidden
        lg:flex
        bg-primary
        text-white
        p-16
        flex-col
        justify-between
      ">

        {/* TOP */}
        <div>

          {/* LOGO */}
          <div className="flex items-center gap-3">

            <div className="
              w-10
              h-10
              rounded-xl
              bg-white
              flex
              items-center
              justify-center
            ">
              <svg
                viewBox="0 0 18 18"
                className="w-5 h-5"
                fill="none"
                stroke="#1A1916"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path
                  d="M3 14l3-4 3 2 3-5 3 4"
                  strokeLinejoin="round"
                />

                <circle
                  cx="9"
                  cy="4"
                  r="1.5"
                />
              </svg>
            </div>

            <h1 className="
              font-serif
              text-3xl
            ">
              InternPath
            </h1>

          </div>

        </div>

        {/* CENTER CONTENT */}
        <div className="max-w-lg">

          <h2 className="
            font-serif
            text-6xl
            leading-tight
          ">
            Smarter internship matching starts here
          </h2>

          <p className="
            mt-8
            text-white/70
            text-lg
            leading-8
          ">
            Discover internships tailored to your
            skills and help recruiters find the
            right candidates faster with AI-powered
            matching.
          </p>

        </div>

        {/* BOTTOM */}
        <p className="text-white/50 text-sm">
          Built for students and recruiters.
        </p>

      </div>

      {/* RIGHT SIDE */}
      <div className="
        flex
        items-center
        justify-center
        px-6
        py-16
        bg-background
      ">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>

    </div>
  );
}

export default AuthLayout;