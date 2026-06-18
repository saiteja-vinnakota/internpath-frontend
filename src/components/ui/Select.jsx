function Select({

  label,

  options = [],

  error,

  className = "",

  ...props

}) {

  return (

    <div>

      {label && (

        <label
          className="
            block
            mb-3
            text-sm
            font-medium
            text-primary
          "
        >

          {label}

        </label>

      )}

      <select
        className={`
          w-full

          h-14

          px-5

          rounded-2xl

          border

          ${
            error
              ? "border-red-300"
              : "border-border"
          }

          bg-white

          outline-none

          transition-all

          focus:border-accent
          focus:ring-4
          focus:ring-blue-50

          ${className}
        `}
        {...props}
      >

        {options.map(
          (option) => (

            <option
              key={
                option.value
              }
              value={
                option.value
              }
            >

              {option.label}

            </option>

          )
        )}

      </select>

      {error && (

        <p
          className="
            mt-2
            text-sm
            text-red-500
          "
        >

          {error}

        </p>

      )}

    </div>

  );
}

export default Select;