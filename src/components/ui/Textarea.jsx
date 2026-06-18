function Textarea({

  label,

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

      <textarea
        className={`
          w-full

          min-h-[160px]

          px-5
          py-4

          rounded-2xl

          border

          ${
            error
              ? "border-red-300"
              : "border-border"
          }

          bg-white

          resize-none

          outline-none

          transition-all

          focus:border-accent
          focus:ring-4
          focus:ring-blue-50

          ${className}
        `}
        {...props}
      />

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

export default Textarea;