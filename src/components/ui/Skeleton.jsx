function Skeleton({
  className = "",
}) {

  return (
    <div
      className={`
        animate-pulse
        rounded-2xl
        bg-stone

        ${className}
      `}
    />
  );
}

export default Skeleton;