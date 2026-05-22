function Badge({
  children,
}) {

  return (
    <span
      className="
        px-3
        py-1.5
        rounded-full
        bg-blue-50
        text-accent
        text-xs
        font-medium
      "
    >
      {children}
    </span>
  );
}

export default Badge;