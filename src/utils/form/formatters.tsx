
export function cleanSpaces(text: string) {
  return text.replace(/\s/g, '');
}
/**
   * This function format number to EUR currency by it-IT locale
   * by default amount is in CENTS
   */
export function moneyFormat(
  amount: number,
  decimalDigits: number = 2,
  fractionDigits: number = 2
) {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(amount ? amount / Math.pow(10, decimalDigits) : 0);
}
  