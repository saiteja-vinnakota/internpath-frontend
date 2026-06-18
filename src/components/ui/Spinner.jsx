function Spinner({

  size = "md",

  color = "white",

}) {

  const sizes = {

    sm: "w-4 h-4 border-2",

    md: "w-6 h-6 border-2",

    lg: "w-8 h-8 border-[3px]",
  };

  const colors = {

    white:
      "border-white/30 border-t-white",

    primary:
      "border-primary/20 border-t-primary",

    accent:
      "border-accent/20 border-t-accent",
  };

  return (
    <div
      className={`
        rounded-full
        animate-spin

        ${sizes[size]}

        ${colors[color]}
      `}
    />
  );
}

export default Spinner;