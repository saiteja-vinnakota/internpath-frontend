export function formatCurrency(
  amount
) {

  if (

    amount === null ||

    amount === undefined ||

    amount === ""

  ) {

    return "-";
  }

  return new Intl.NumberFormat(
    "en-IN",
    {

      style: "currency",

      currency: "INR",

      maximumFractionDigits: 0,
    }
  ).format(amount);
}

export function formatStipend(
  amount
) {

  if (

    amount === null ||

    amount === undefined ||

    amount === ""

  ) {

    return "Unpaid";
  }

  return `${formatCurrency(
    amount
  )}/month`;
}