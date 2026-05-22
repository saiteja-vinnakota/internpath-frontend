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

      <Topbar />

      <main>
        {children}
      </main>

    </div>
  );
}

export default RootLayout;