const variants = {
  primary:
    "bg-primary text-white hover:bg-black border-primary",

  secondary:
    "bg-stone text-primary hover:bg-border border-border",

  outline:
    "bg-transparent text-primary border-border hover:bg-stone",

  white:
    "bg-white text-primary hover:bg-stone border-white",
};

function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  return (
    <button
      className={`
        px-5 py-3
        rounded-xl
        border
        font-medium
        transition-all
        duration-300
        hover:-translate-y-0.5
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