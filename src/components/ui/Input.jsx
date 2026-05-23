import {
  useState,
} from "react";

import {
  Eye,
  EyeOff,
} from "lucide-react";

function Input({

  label,

  type = "text",

  className = "",

  ...props

}) {

  const [showPassword, setShowPassword] =
    useState(false);

  const isPassword =
    type === "password";

  const inputType =
    isPassword
      ? (
          showPassword
            ? "text"
            : "password"
        )
      : type;

  return (
    <div>

      {/* LABEL */}
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

      {/* INPUT WRAPPER */}
      <div className="relative">

        {/* INPUT */}
        <input
          type={inputType}
          className={`
            w-full
            h-14
            px-5
            rounded-2xl
            border
            border-border
            bg-white
            text-primary
            outline-none
            transition-all
            duration-200

            placeholder:text-muted

            focus:border-accent
            focus:ring-4
            focus:ring-blue-50

            ${isPassword ? "pr-14" : ""}

            ${className}
          `}
          {...props}
        />

        {/* PASSWORD TOGGLE */}
        {isPassword && (

          <button
            type="button"
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
            className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              text-muted
              hover:text-primary
              transition-colors
            "
          >

            {showPassword ? (

              <EyeOff size={20} />

            ) : (

              <Eye size={20} />

            )}

          </button>
        )}

      </div>

    </div>
  );
}

export default Input;