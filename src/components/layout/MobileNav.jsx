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
  User,
  Bell,
  PlusSquare,
} from "lucide-react";

import {
  Link,
  useLocation,
} from "react-router-dom";

import {
  useAuth,
} from "../../context/AuthContext";

import {
  useNotificationContext,
} from "../../context/NotificationContext";

function MobileNav() {

  const [open, setOpen] =
    useState(false);

  const location =
    useLocation();

  const { user } =
    useAuth();

  const {
    unreadCount,
  } =
    useNotificationContext();

  // STUDENT NAV
  const studentNavItems = [

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
      label: "Saved Jobs",
      icon: Bookmark,
      path: "/student/saved",
    },

    {
      label: "Notifications",
      icon: Bell,
      path: "/notifications",
    },

    {
      label: "Profile",
      icon: User,
      path: "/student/profile",
    },
  ];

  // RECRUITER NAV
  const recruiterNavItems = [

    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/recruiter/dashboard",
    },

    {
      label: "Manage Listings",
      icon: BriefcaseBusiness,
      path: "/recruiter/manage-listings",
    },

    {
      label: "Post Internship",
      icon: PlusSquare,
      path: "/recruiter/post-job",
    },

    {
      label: "Notifications",
      icon: Bell,
      path: "/notifications",
    },

    {
      label: "Profile",
      icon: User,
      path: "/recruiter/profile",
    },
  ];

  const navItems =

    user?.role ===
    "recruiter"

      ? recruiterNavItems

      : studentNavItems;

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

        {/* ACTIONS */}
        <div
          className="
            flex
            items-center
            gap-2
          "
        >

          {/* NOTIFICATION BUTTON */}
          <Link
            to="/notifications"
            className="
              relative

              w-10
              h-10

              rounded-xl

              bg-stone

              flex
              items-center
              justify-center
            "
          >

            <Bell size={18} />

            {unreadCount > 0 && (

              <span
                className="
                  absolute

                  -top-1
                  -right-1

                  min-w-[18px]
                  h-[18px]

                  px-1

                  rounded-full

                  bg-accent
                  text-white

                  text-[10px]
                  font-semibold

                  flex
                  items-center
                  justify-center
                "
              >

                {unreadCount > 99
                  ? "99+"
                  : unreadCount}

              </span>

            )}

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

            {open

              ? <X size={22} />

              : <Menu size={22} />
            }

          </button>

        </div>

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

          {navItems.map(
            (item) => {

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

                        ? `
                          bg-primary
                          text-white
                        `

                        : `
                          text-muted
                          hover:bg-stone
                          hover:text-primary
                        `
                    }
                  `}
                >

                  <Icon size={20} />

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      w-full
                    "
                  >

                    <span
                      className="
                        text-sm
                        font-medium
                      "
                    >
                      {item.label}
                    </span>

                    {item.label ===
                      "Notifications" &&

                      unreadCount > 0 && (

                      <span
                        className="
                          min-w-[20px]
                          h-[20px]

                          px-1

                          rounded-full

                          bg-accent
                          text-white

                          text-[10px]
                          font-semibold

                          flex
                          items-center
                          justify-center
                        "
                      >

                        {unreadCount > 99
                          ? "99+"
                          : unreadCount}

                      </span>

                    )}

                  </div>

                </Link>

              );
            }
          )}

        </nav>

      </div>
    </>
  );
}

export default MobileNav;