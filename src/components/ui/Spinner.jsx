function Spinner({
  size = "md",
}) {

  const sizes = {

    sm: "w-4 h-4 border-2",

    md: "w-6 h-6 border-2",

    lg: "w-8 h-8 border-[3px]",
  };

  return (
    <div
      className={`
        rounded-full
        border-white/30
        border-t-white
        animate-spin

        ${sizes[size]}
      `}
    />
  );
}

export default Spinner;