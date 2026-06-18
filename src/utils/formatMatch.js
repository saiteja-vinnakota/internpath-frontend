export function formatMatchScore(
  score
) {

  if (

    score === null ||

    score === undefined

  ) {

    return "N/A";
  }

  return `${Math.round(
    score
  )}%`;
}

export function getMatchLabel(
  score
) {

  if (score >= 90) {
    return "Excellent Match";
  }

  if (score >= 75) {
    return "Strong Match";
  }

  if (score >= 60) {
    return "Good Match";
  }

  if (score >= 40) {
    return "Average Match";
  }

  return "Low Match";
}

export function getMatchColor(
  score
) {

  if (score >= 90) {

    return {
      bg: "bg-green-50",
      text: "text-green-700",
    };
  }

  if (score >= 75) {

    return {
      bg: "bg-blue-50",
      text: "text-blue-700",
    };
  }

  if (score >= 60) {

    return {
      bg: "bg-amber-50",
      text: "text-amber-700",
    };
  }

  return {
    bg: "bg-red-50",
    text: "text-red-700",
  };
}