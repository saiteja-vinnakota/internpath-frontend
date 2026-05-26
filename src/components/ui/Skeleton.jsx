function Skeleton({
  className = "",
}) {

  return (

    <div
      className={`
        relative
        overflow-hidden
        rounded-2xl

        bg-[#E7E5E4]

        before:absolute
        before:inset-0

        before:-translate-x-full

        before:animate-[shimmer_1.6s_infinite]

        before:bg-gradient-to-r

        before:from-transparent

        before:via-white/90

        before:to-transparent

        shadow-sm

        ${className}
      `}
    />

  );
}

export default Skeleton;