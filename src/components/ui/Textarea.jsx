function Textarea({
  label,
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

      {/* TEXTAREA */}
      <textarea
        className={`
          w-full
          min-h-[140px]
          px-4
          py-4
          bg-stone
          border
          border-border
          rounded-2xl
          outline-none
          text-sm
          resize-none
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

export default Textarea;