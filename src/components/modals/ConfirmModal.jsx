import {
  useEffect,
} from "react";

import {
  AlertTriangle,
  Info,
  X,
} from "lucide-react";

import Button
from "../ui/Button";

function ConfirmModal({

  open,

  title = "Confirm Action",

  description =
    "Are you sure you want to continue?",

  confirmText = "Confirm",

  cancelText = "Cancel",

  loading = false,

  variant = "danger",

  icon = null,

  onConfirm,

  onClose,

}) {

  // ESC CLOSE
  useEffect(() => {

    if (!open) {
      return;
    }

    const handleKeyDown =
      (event) => {

        if (
          event.key === "Escape"
        ) {

          onClose?.();
        }
      };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    // LOCK SCROLL
    document.body.style.overflow =
      "hidden";

    return () => {

      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

      document.body.style.overflow =
        "auto";
    };

  }, [open, onClose]);

  if (!open) {

    return null;
  }

  const variantStyles = {

    danger: {

      strip:
        "bg-red-500",

      iconBox:
        "bg-red-50 text-red-500",

      button:
        "bg-red-500 hover:bg-red-600 border-red-500",
    },

    primary: {

      strip:
        "bg-primary",

      iconBox:
        "bg-blue-50 text-accent",

      button: "",
    },

    warning: {

      strip:
        "bg-amber-500",

      iconBox:
        "bg-amber-50 text-amber-600",

      button:
        "bg-amber-500 hover:bg-amber-600 border-amber-500",
    },
  };

  const styles =
    variantStyles[
      variant
    ];

  const IconComponent =

    icon ||

    (variant === "primary"

      ? Info

      : AlertTriangle);

  return (

    <div
      className="
        fixed
        inset-0
        z-[100]

        flex
        items-center
        justify-center

        bg-black/50

        backdrop-blur-[4px]

        p-4
      "
      onClick={onClose}
    >

      {/* MODAL */}

      <div
        onClick={(e) =>
          e.stopPropagation()
        }
        className="
          relative

          w-full
          max-w-lg

          overflow-hidden

          rounded-[36px]

          border
          border-border

          bg-white

          shadow-[0_20px_80px_rgba(0,0,0,0.15)]

          animate-in
          fade-in
          zoom-in-95
          duration-200
        "
      >

        {/* TOP STRIP */}

        <div
          className={`
            h-2
            w-full

            ${styles.strip}
          `}
        />

        {/* CLOSE */}

        <button
          onClick={onClose}
          disabled={loading}
          className="
            absolute

            right-5
            top-5

            w-10
            h-10

            rounded-2xl

            flex
            items-center
            justify-center

            text-muted

            transition-colors

            hover:bg-stone
            hover:text-primary
          "
        >

          <X size={20} />

        </button>

        {/* CONTENT */}

        <div
          className="
            p-6

            sm:p-8
          "
        >

          {/* ICON */}

          <div
            className={`
              w-16
              h-16

              rounded-[24px]

              flex
              items-center
              justify-center

              ${styles.iconBox}
            `}
          >

            <IconComponent
              size={30}
            />

          </div>

          {/* TITLE */}

          <h2
            className="
              mt-6

              text-2xl
              sm:text-3xl

              font-semibold

              tracking-tight

              text-primary
            "
          >

            {title}

          </h2>

          {/* DESCRIPTION */}

          <p
            className="
              mt-4

              text-sm
              sm:text-[15px]

              leading-7

              text-muted
            "
          >

            {description}

          </p>

          {/* ACTIONS */}

          <div
            className="
              mt-10

              flex

              flex-col-reverse
              sm:flex-row

              justify-end

              gap-3
            "
          >

            <Button
              variant="secondary"
              onClick={onClose}
              disabled={loading}
              className="
                h-12

                px-6

                rounded-2xl
              "
            >

              {cancelText}

            </Button>

            <Button
              onClick={onConfirm}
              disabled={loading}
              className={`
                h-12

                px-6

                rounded-2xl

                ${styles.button}
              `}
            >

              {loading

                ? "Please wait..."

                : confirmText}

            </Button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ConfirmModal;