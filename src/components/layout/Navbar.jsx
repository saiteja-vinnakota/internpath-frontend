import { Menu, X } from "lucide-react";
import { useState } from "react";
import Button from "../common/Button";

function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <nav
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
        <div className="flex items-center gap-3">
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
              <path d="M3 14l3-4 3 2 3-5 3 4" strokeLinejoin="round" />

              <circle cx="9" cy="4" r="1.5" />
            </svg>
          </div>

          <h1 className="font-serif text-2xl text-primary">InternPath</h1>
        </div>

        {/* DESKTOP LINKS */}
        <div
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
          <a href="#" className="hover:text-primary transition-colors">
            Students
          </a>

          <a href="#" className="hover:text-primary transition-colors">
            Recruiters
          </a>

          <a href="#" className="hover:text-primary transition-colors">
            Features
          </a>

          <a href="#" className="hover:text-primary transition-colors">
            Pricing
          </a>
        </div>

        {/* DESKTOP BUTTONS */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="outline">Sign In</Button>

          <Button>Get Started</Button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          {mobileMenu ? <X size={26} /> : <Menu size={26} />}
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
          <a className="block text-muted font-medium">Students</a>

          <a className="block text-muted font-medium">Recruiters</a>

          <a className="block text-muted font-medium">Features</a>

          <a className="block text-muted font-medium">Pricing</a>

          <div className="pt-3 flex flex-col gap-3">
            <Button variant="outline">Sign In</Button>

            <Button>Get Started</Button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
