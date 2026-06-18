import {
  useState,
} from "react";

import {
  Eye,
  EyeOff,
} from "lucide-react";

function Input({

  label,

  error,

  leftIcon,

  rightElement,

  type = "text",

  className = "",

  ...props

}) {

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

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

    <div className="w-full">

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

      <div className="relative">

        {leftIcon && (

          <div
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-muted
            "
          >

            {leftIcon}

          </div>

        )}

        <input
          type={inputType}
          className={`
            w-full

            h-14

            rounded-2xl

            border

            ${
              error
                ? "border-red-300"
                : "border-border"
            }

            bg-white

            px-5

            ${
              leftIcon
                ? "pl-12"
                : ""
            }

            ${
              isPassword
                ? "pr-14"
                : ""
            }

            outline-none

            transition-all

            focus:border-accent
            focus:ring-4
            focus:ring-blue-50

            ${className}
          `}
          {...props}
        />

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
            "
          >

            {showPassword

              ? <EyeOff size={20} />

              : <Eye size={20} />
            }

          </button>

        )}

        {rightElement}

      </div>

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

export default Input;