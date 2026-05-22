function Footer() {
  return (
    <footer className="
      border-t
      border-border
      px-6
      lg:px-10
      py-16
      bg-white
    ">

      <div className="
        max-w-7xl
        mx-auto
      ">

        <div className="
          grid
          grid-cols-1
          md:grid-cols-4
          gap-12
        ">

          {/* BRAND */}
          <div className="md:col-span-2">

            <div className="flex items-center gap-3">

              {/* LOGO */}
              <div className="
                w-10
                h-10
                rounded-xl
                bg-primary
                flex
                items-center
                justify-center
              ">
                <svg
                  viewBox="0 0 18 18"
                  className="w-5 h-5"
                  fill="none"
                  stroke="white"
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

              <h2 className="
                font-serif
                text-2xl
                text-primary
              ">
                InternPath
              </h2>

            </div>

            <p className="
              mt-6
              text-muted
              leading-7
              max-w-md
            ">
              AI-powered internship platform helping
              students discover better opportunities
              and recruiters find stronger candidates.
            </p>

          </div>

          {/* STUDENTS */}
          <div>

            <h3 className="
              font-semibold
              text-primary
              mb-5
            ">
              Students
            </h3>

            <div className="
              flex
              flex-col
              gap-3
              text-muted
            ">
              <a href="#" className="hover:text-primary">
                Browse Internships
              </a>

              <a href="#" className="hover:text-primary">
                Track Applications
              </a>

              <a href="#" className="hover:text-primary">
                Resume Profile
              </a>
            </div>

          </div>

          {/* RECRUITERS */}
          <div>

            <h3 className="
              font-semibold
              text-primary
              mb-5
            ">
              Recruiters
            </h3>

            <div className="
              flex
              flex-col
              gap-3
              text-muted
            ">
              <a href="#" className="hover:text-primary">
                Post Internships
              </a>

              <a href="#" className="hover:text-primary">
                Review Applicants
              </a>

              <a href="#" className="hover:text-primary">
                Dashboard
              </a>
            </div>

          </div>

        </div>

        {/* BOTTOM */}
        <div className="
          mt-16
          pt-8
          border-t
          border-border
          flex
          flex-col
          md:flex-row
          gap-4
          items-center
          justify-between
        ">

          <p className="text-sm text-muted">
            © 2026 InternPath. All rights reserved.
          </p>

          <p className="text-sm text-muted">
            Built with MERN Stack
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;