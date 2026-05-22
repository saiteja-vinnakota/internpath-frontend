function Divider({
  className = "",
}) {

  return (
    <div
      className={`
        w-full
        h-px
        bg-border

        ${className}
      `}
    />
  );
}

export default Divider;