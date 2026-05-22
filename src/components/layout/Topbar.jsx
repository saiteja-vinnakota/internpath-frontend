import {
  Menu,
  X,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

import {
  useState,
} from "react";

import Button
from "../ui/Button";

function Topbar() {

  const [mobileMenu, setMobileMenu] =
    useState(false);

  return (
    <header
      className="
        fixed
        top-0
        left-0
        right-0
        z-50
        bg-white/80
        backdrop-blur-md
        border-b
        border-border
      "
    >

      <div
        className="
          max-w-7xl
          mx-auto
          px-6
          lg:px-10
          h-16
          flex
          items-center
          justify-between
        "
      >

        {/* LOGO */}
        <Link
          to="/"
          className="
            flex
            items-center
            gap-3
          "
        >

          <div
            className="
              w-9
              h-9
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
              text-2xl
              text-primary
            "
          >
            InternPath
          </h1>

        </Link>

        {/* DESKTOP LINKS */}
        <nav
          className="
            hidden
            md:flex
            items-center
            gap-8
            text-sm
            text-muted
            font-medium
          "
        >

          <a
            href="#features"
            className="
              hover:text-primary
              transition-colors
            "
          >
            Features
          </a>

          <a
            href="#workflow"
            className="
              hover:text-primary
              transition-colors
            "
          >
            Workflow
          </a>

          <Link
            to="/jobs"
            className="
              hover:text-primary
              transition-colors
            "
          >
            Internships
          </Link>

        </nav>

        {/* DESKTOP BUTTONS */}
        <div
          className="
            hidden
            md:flex
            items-center
            gap-3
          "
        >

          <Link to="/login">

            <Button variant="ghost">
              Sign In
            </Button>

          </Link>

          <Link to="/register">

            <Button>
              Get Started
            </Button>

          </Link>

        </div>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden"
          onClick={() =>
            setMobileMenu(!mobileMenu)
          }
        >

          {mobileMenu ? (
            <X size={26} />
          ) : (
            <Menu size={26} />
          )}

        </button>

      </div>

      {/* MOBILE MENU */}
      {mobileMenu && (
        <div
          className="
            md:hidden
            bg-white
            border-t
            border-border
            px-6
            py-6
            space-y-5
          "
        >

          <a
            href="#features"
            className="
              block
              text-muted
              font-medium
            "
          >
            Features
          </a>

          <a
            href="#workflow"
            className="
              block
              text-muted
              font-medium
            "
          >
            Workflow
          </a>

          <Link
            to="/jobs"
            className="
              block
              text-muted
              font-medium
            "
          >
            Internships
          </Link>

          <div
            className="
              pt-3
              flex
              flex-col
              gap-3
            "
          >

            <Link to="/login">

              <Button
                variant="secondary"
                className="w-full"
              >
                Sign In
              </Button>

            </Link>

            <Link to="/register">

              <Button className="w-full">
                Get Started
              </Button>

            </Link>

          </div>

        </div>
      )}

    </header>
  );
}

export default Topbar;