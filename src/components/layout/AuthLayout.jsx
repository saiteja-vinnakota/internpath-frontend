function AuthLayout({
  children,
}) {

  return (
    <div
      className="
        min-h-screen
        bg-stone
        flex
        items-center
        justify-center
        px-4
      "
    >

      <div
        className="
          w-full
          max-w-md
          bg-white
          border
          border-border
          rounded-3xl
          p-8
        "
      >

        {children}

      </div>

    </div>
  );
}

export default AuthLayout;