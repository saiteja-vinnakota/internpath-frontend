function Badge({

  children,

  className = "",

}) {

  return (
    <span
      className={`
        px-3
        py-1.5
        rounded-full
        text-xs
        font-medium

        ${className}
      `}
    >

      {children}

    </span>
  );
}

export default Badge;