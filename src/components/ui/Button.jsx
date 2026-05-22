function Button({
  children,
  className = "",
  variant = "primary",
  ...props
}) {

  const variants = {

    primary:
      "bg-primary text-white hover:bg-black",

    secondary:
      "bg-stone border border-border hover:bg-white",

    white:
      "bg-white text-primary hover:bg-stone",

    outline:
      "border border-border bg-transparent hover:bg-stone",

    ghost:
      "hover:bg-stone",
  };

  return (
    <button
      className={`
        h-11
        px-5
        rounded-2xl
        text-sm
        font-medium
        transition-all
        duration-200
        disabled:opacity-50
        disabled:cursor-not-allowed

        ${variants[variant]}

        ${className}
      `}
      {...props}
    >

      {children}

    </button>
  );
}

export default Button;