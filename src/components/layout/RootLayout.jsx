import Topbar from "./Topbar";

function RootLayout({
  children,
}) {

  return (
    <div
      className="
        min-h-screen
        bg-stone
      "
    >

      {/* NAVBAR */}
      <Topbar />

      {/* PAGE CONTENT */}
      <main
        className="
          relative
        "
      >
        {children}
      </main>

    </div>
  );
}

export default RootLayout;