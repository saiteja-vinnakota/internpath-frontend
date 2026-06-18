import {
  Link,
} from "react-router-dom";

function Footer() {
  return (
    <footer
      className="
        border-t
        border-border

        bg-white
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto

          px-5
          sm:px-6
          lg:px-8

          py-16
        "
      >
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-3

            gap-12
          "
        >
          {/* BRAND */}
          <div>
            <h3
              className="
                text-2xl
                font-semibold
                text-primary
              "
            >
              InternPath
            </h3>

            <p
              className="
                mt-4

                text-muted
                leading-7
              "
            >
              AI-powered internship platform
              connecting students with
              recruiters through smarter
              matching and hiring.
            </p>
          </div>

          {/* PLATFORM */}
          <div>
            <h4
              className="
                text-lg
                font-semibold
                text-primary
              "
            >
              Platform
            </h4>

            <div
              className="
                mt-5
                space-y-3
              "
            >
              <FooterLink
                to="/jobs"
              >
                Explore Jobs
              </FooterLink>

              <FooterLink
                to="/login"
              >
                Login
              </FooterLink>

              <FooterLink
                to="/register"
              >
                Register
              </FooterLink>
            </div>
          </div>

          {/* RESOURCES */}
          <div>
            <h4
              className="
                text-lg
                font-semibold
                text-primary
              "
            >
              Resources
            </h4>

            <div
              className="
                mt-5
                space-y-3
              "
            >
              <p
                className="
                  text-muted
                "
              >
                Privacy Policy
              </p>

              <p
                className="
                  text-muted
                "
              >
                Terms of Service
              </p>

              <p
                className="
                  text-muted
                "
              >
                Contact Support
              </p>
            </div>
          </div>
        </div>

        <div
          className="
            mt-12
            pt-8

            border-t
            border-border

            text-center
          "
        >
          <p
            className="
              text-sm
              text-muted
            "
          >
            © 2026 InternPath.
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  to,
  children,
}) {
  return (
    <Link
      to={to}
      className="
        block

        text-muted

        hover:text-primary

        transition-colors
      "
    >
      {children}
    </Link>
  );
}

export default Footer;