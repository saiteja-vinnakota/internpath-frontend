function Input({
  label,
  className = "",
  ...props
}) {

  return (
    <div>

      {label && (
        <label
          className="
            block
            mb-2
            text-sm
            font-medium
            text-primary
          "
        >
          {label}
        </label>
      )}

      <input
        className={`
          w-full
          h-12
          px-4
          bg-stone
          border
          border-border
          rounded-2xl
          outline-none
          text-sm
          transition-all
          focus:border-accent
          focus:ring-4
          focus:ring-blue-100

          ${className}
        `}
        {...props}
      />

    </div>
  );
}

export default Input;