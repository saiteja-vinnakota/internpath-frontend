function Select({
  label,
  options = [],
  className = "",
  ...props
}) {

  return (
    <div>

      {/* LABEL */}
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

      {/* SELECT */}
      <select
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
      >

        {options.map((option) => (

          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>

        ))}

      </select>

    </div>
  );
}

export default Select;