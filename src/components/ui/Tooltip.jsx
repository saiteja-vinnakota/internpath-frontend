function Tooltip({
  text,
  children,
}) {

  return (
    <div
      className="
        relative
        group
        inline-flex
      "
    >

      {/* TARGET */}
      {children}

      {/* TOOLTIP */}
      <div
        className="
          absolute
          bottom-full
          left-1/2
          -translate-x-1/2
          mb-3
          opacity-0
          invisible
          group-hover:opacity-100
          group-hover:visible
          transition-all
          duration-200
          pointer-events-none
          z-50
        "
      >

        <div
          className="
            px-3
            py-2
            rounded-xl
            bg-primary
            text-white
            text-xs
            whitespace-nowrap
            shadow-medium
          "
        >
          {text}
        </div>

      </div>

    </div>
  );
}

export default Tooltip;