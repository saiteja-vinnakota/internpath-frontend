function Avatar({
  src,
  alt = "User",
  size = "md",
}) {

  const sizes = {

    sm: "w-8 h-8 text-xs",

    md: "w-11 h-11 text-sm",

    lg: "w-14 h-14 text-base",

    xl: "w-20 h-20 text-xl",
  };

  return (
    <div
      className={`
        ${sizes[size]}

        rounded-full
        overflow-hidden
        bg-stone
        border
        border-border
        flex
        items-center
        justify-center
        font-medium
        text-primary
      `}
    >

      {src ? (

        <img
          src={src}
          alt={alt}
          className="
            w-full
            h-full
            object-cover
          "
        />

      ) : (

        <span>
          {alt.charAt(0).toUpperCase()}
        </span>

      )}

    </div>
  );
}

export default Avatar;