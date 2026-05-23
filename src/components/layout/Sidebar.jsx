import {
  LayoutDashboard,
  BriefcaseBusiness,
  Bookmark,
  FileText,
  User,
  LogOut,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

import Avatar from "../ui/Avatar";

import { useAuth } from "../../context/AuthContext";

function Sidebar() {
  const location = useLocation();

  const {
    user,

    logout,
  } = useAuth();

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
      label: "Saved Jobs",

      icon: Bookmark,

      path: "/student/saved",
    },

    {
      label: "Applications",

      icon: FileText,

      path: "/student/applications",
    },

    {
      label: "Profile",

      icon: User,

      path: "/student/profile",
    },
  ];

  return (
    <aside
      className="
        h-full
        bg-white
        border-r
        border-border
        px-6
        py-8
        flex
        flex-col
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

            <circle cx="9" cy="4" r="1.5" />
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

      {/* NAVIGATION */}
      <nav
        className="
          mt-12
          space-y-2
        "
      >
        {navItems.map((item) => {
          const Icon = item.icon;

          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.label}
              to={item.path}
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
                      shadow-sm
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

      {/* PROFILE */}
      <div className="mt-auto">
        <div
          className="
            p-4
            rounded-3xl
            bg-stone
          "
        >
          {/* USER */}
          <Link
            to="/student/profile"
            className="
              flex
              items-center
              gap-4
            "
          >
            <Avatar src={user?.profilePicture} alt={user?.name} />

            <div
              className="
                min-w-0
              "
            >
              <h3
                className="
                  text-sm
                  font-semibold
                  text-primary
                  truncate
                "
              >
                {user?.name || "Student"}
              </h3>

              <p
                className="
                  text-xs
                  text-muted
                  mt-1
                  truncate
                "
              >
                {user?.email}
              </p>
            </div>
          </Link>

          {/* LOGOUT */}
          <button
            onClick={logout}
            className="
              mt-5
              w-full
              flex
              items-center
              justify-center
              gap-2
              h-11
              rounded-2xl
              text-sm
              font-medium
              text-red-500
              hover:bg-red-50
              transition-all
            "
          >
            <LogOut size={18} />

            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
