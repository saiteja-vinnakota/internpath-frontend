function Input({
  label,
  type = "text",
  placeholder,
  ...props
}) {
  return (
    <div className="space-y-2">

      {/* LABEL */}
      <label className="
        text-sm
        font-medium
        text-primary
      ">
        {label}
      </label>

      {/* INPUT */}
      <input
        type={type}
        placeholder={placeholder}
        className="
          w-full
          px-4
          py-3.5
          rounded-2xl
          border
          border-border
          bg-white
          outline-none
          transition-all
          duration-300
          focus:border-accent
          focus:ring-4
          focus:ring-blue-100
          placeholder:text-muted
        "
        {...props}
      />

    </div>
  );
}

export default Input;