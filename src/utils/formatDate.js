export function formatDate(
  date
) {

  if (!date) {
    return "-";
  }

  return new Date(date)
    .toLocaleDateString(
      "en-IN",
      {

        day: "numeric",

        month: "short",

        year: "numeric",
      }
    );
}

export function formatRelativeDate(
  date
) {

  if (!date) {
    return "-";
  }

  const now =
    new Date();

  const target =
    new Date(date);

  const diff =
    now - target;

  const days =
    Math.floor(
      diff /
      (
        1000 *
        60 *
        60 *
        24
      )
    );

  if (days === 0) {
    return "Today";
  }

  if (days === 1) {
    return "Yesterday";
  }

  if (days < 7) {
    return `${days} days ago`;
  }

  return formatDate(
    date
  );
}