import Spinner from "./Spinner";

function Button({

  children,

  variant = "primary",

  className = "",

  loading = false,

  disabled = false,

  ...props

}) {

  const variants = {

    primary: `
      bg-primary
      text-white
      hover:bg-black
    `,

    outline: `
      border
      border-border
      bg-white
      text-primary
      hover:bg-stone
    `,

    white: `
      bg-white
      text-primary
      hover:bg-stone
    `,
  };

  return (
    <button
      className={`
        h-12
        px-6
        rounded-2xl
        font-medium
        transition-all
        duration-200
        flex
        items-center
        justify-center
        gap-3
        disabled:opacity-60
        disabled:cursor-not-allowed

        ${variants[variant]}

        ${className}
      `}
      disabled={
        loading || disabled
      }
      {...props}
    >

      {loading && (
        <Spinner size="sm" />
      )}

      <span>
        {children}
      </span>

    </button>
  );
}

export default Button;