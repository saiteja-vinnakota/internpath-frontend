function Checkbox({
  label,
  className = "",
  ...props
}) {

  return (
    <label
      className="
        flex
        items-center
        gap-3
        cursor-pointer
        select-none
      "
    >

      {/* INPUT */}
      <input
        type="checkbox"
        className={`
          w-5
          h-5
          rounded-md
          border-border
          text-primary
          focus:ring-accent

          ${className}
        `}
        {...props}
      />

      {/* LABEL */}
      {label && (
        <span
          className="
            text-sm
            text-primary
          "
        >
          {label}
        </span>
      )}

    </label>
  );
}

export default Checkbox;