/**
 * Evaluates the complementary error function erfc(x).
 *
 * This implementation uses the Abramowitz-Stegun approximation:
 *
 * erfc(x) ≈ (a1 t + a2 t^2 + ... + a5 t^5) * exp(-x^2)
 *
 * with t = 1 / (1 + p * |x|), and an exact symmetry relation for negative values.
 *
 * The approximation is accurate for typical numeric work and is suitable for use
 * in a Newton iteration for the inverse complementary error function.
 *
 * @param x - input value.
 * @returns the complementary error function value for x.
 */
export function erfc(x: number): number {
  if (Number.isNaN(x)) {
    return Number.NaN;
  }

  if (x === 0) {
    return 1;
  }

  if (x === Number.POSITIVE_INFINITY) {
    return 0;
  }

  if (x === Number.NEGATIVE_INFINITY) {
    return 2;
  }

  const sign = x < 0 ? -1 : 1;
  const ax = Math.abs(x);

  const p = 0.3275911;

  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;

  const t = 1 / (1 + p * ax);
  const polynomial = ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t;
  const result = polynomial * Math.exp(-ax * ax);

  return sign >= 0 ? result : 2 - result;
}
