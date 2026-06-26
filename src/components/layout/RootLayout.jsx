import { Outlet } from "react-router-dom";

import Topbar from "./Topbar";
import Footer from "../landing/Footer";

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

      <Footer />

    </div>

  );
}

export default RootLayout;