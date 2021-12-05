export const formatNumberToCurrency = (number, currency = "USD") => {
  if (number === undefined) return 0;
  number = Number(number);
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(number);
};
