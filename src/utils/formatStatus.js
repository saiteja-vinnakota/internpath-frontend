export function formatStatus(
  status
) {

  if (!status) {
    return "Unknown";
  }

  return status

    .toLowerCase()

    .replace(
      "_",
      " "
    )

    .replace(
      /\b\w/g,
      (char) =>
        char.toUpperCase()
    );
}

export function getStatusColor(
  status
) {

  switch (
    status?.toUpperCase()
  ) {

    case "APPLIED":
      return {
        bg: "bg-blue-50",
        text: "text-blue-700",
      };

    case "SHORTLISTED":
      return {
        bg: "bg-purple-50",
        text: "text-purple-700",
      };

    case "INTERVIEW":
      return {
        bg: "bg-amber-50",
        text: "text-amber-700",
      };

    case "SELECTED":
      return {
        bg: "bg-green-50",
        text: "text-green-700",
      };

    case "REJECTED":
      return {
        bg: "bg-red-50",
        text: "text-red-700",
      };

    default:
      return {
        bg: "bg-gray-50",
        text: "text-gray-700",
      };
  }
}