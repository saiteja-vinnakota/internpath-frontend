import Sidebar from "./Sidebar";

import MobileNav from "./MobileNav";

function DashboardLayout({
  children,
}) {

  return (
    <div
      className="
        min-h-screen
        bg-stone
      "
    >

      {/* DESKTOP SIDEBAR */}
      <div
        className="
          hidden
          lg:block
          fixed
          top-0
          left-0
          h-screen
          w-[270px]
          z-40
        "
      >

        <Sidebar />

      </div>

      {/* MOBILE NAV */}
      <MobileNav />

      {/* MAIN CONTENT */}
      <main
        className="
          lg:ml-[270px]
          min-h-screen
          px-4
          sm:px-6
          lg:px-10
          py-6
        "
      >

        {children}

      </main>

    </div>
  );
}

export default DashboardLayout;