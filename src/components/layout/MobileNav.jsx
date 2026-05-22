import {
  useState,
} from "react";

import {
  Menu,
  X,
  LayoutDashboard,
  BriefcaseBusiness,
  Bookmark,
  FileText,
  Settings,
} from "lucide-react";

import {
  Link,
  useLocation,
} from "react-router-dom";

function MobileNav() {

  const [open, setOpen] =
    useState(false);

  const location =
    useLocation();

  const navItems = [

    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/student/dashboard",
    },

    {
      label: "Internships",
      icon: BriefcaseBusiness,
      path: "/jobs",
    },

    {
      label: "Applications",
      icon: FileText,
      path: "/student/applications",
    },

    {
      label: "Saved",
      icon: Bookmark,
      path: "/student/saved",
    },

    {
      label: "Settings",
      icon: Settings,
      path: "/settings",
    },
  ];

  return (
    <>
      {/* TOPBAR */}
      <div
        className="
          lg:hidden
          sticky
          top-0
          z-40
          bg-white/80
          backdrop-blur-md
          border-b
          border-border
          px-4
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

        {/* MENU BUTTON */}
        <button
          onClick={() =>
            setOpen(!open)
          }
          className="
            w-10
            h-10
            rounded-xl
            bg-stone
            flex
            items-center
            justify-center
          "
        >

          {open ? (
            <X size={22} />
          ) : (
            <Menu size={22} />
          )}

        </button>

      </div>

      {/* OVERLAY */}
      {open && (
        <div
          className="
            fixed
            inset-0
            z-40
            bg-black/30
            lg:hidden
          "
          onClick={() =>
            setOpen(false)
          }
        />
      )}

      {/* DRAWER */}
      <div
        className={`
          fixed
          top-0
          left-0
          h-full
          w-[280px]
          bg-white
          z-50
          border-r
          border-border
          p-6
          transition-transform
          duration-300
          lg:hidden

          ${
            open
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >

        {/* HEADER */}
        <div
          className="
            flex
            items-center
            justify-between
          "
        >

          <h2
            className="
              text-xl
              font-semibold
              text-primary
            "
          >
            Menu
          </h2>

          <button
            onClick={() =>
              setOpen(false)
            }
            className="
              w-10
              h-10
              rounded-xl
              bg-stone
              flex
              items-center
              justify-center
            "
          >

            <X size={20} />

          </button>

        </div>

        {/* NAVIGATION */}
        <nav
          className="
            mt-10
            space-y-2
          "
        >

          {navItems.map((item) => {

            const Icon =
              item.icon;

            const isActive =
              location.pathname ===
              item.path;

            return (
              <Link
                key={item.label}
                to={item.path}
                onClick={() =>
                  setOpen(false)
                }
                className={`
                  flex
                  items-center
                  gap-4
                  px-4
                  py-3
                  rounded-2xl
                  transition-all
                  duration-200

                  ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-muted hover:bg-stone hover:text-primary"
                  }
                `}
              >

                <Icon size={20} />

                <span
                  className="
                    text-sm
                    font-medium
                  "
                >
                  {item.label}
                </span>

              </Link>
            );
          })}

        </nav>

      </div>
    </>
  );
}

export default MobileNav;