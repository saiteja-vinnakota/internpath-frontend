import { Outlet } from "react-router-dom";

import Topbar from "./Topbar";

function RootLayout() {

  return (

    <div
      className="
        min-h-screen
        bg-stone
      "
    >

      <Topbar />

      <main>

        <Outlet />

      </main>

    </div>

  );
}

export default RootLayout;