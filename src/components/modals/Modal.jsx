function Modal({
  open,

  children,

  onClose,

  maxWidth = "max-w-2xl",
}) {
  if (!open) {
    return null;
  }

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

        backdrop-blur-sm

        px-4
      "
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          w-full
          ${maxWidth}

          bg-white

          border
          border-border

          rounded-[36px]

          shadow-[0_20px_80px_rgba(0,0,0,0.15)]

          overflow-hidden
        `}
      >
        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
