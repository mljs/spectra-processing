/**
 * RayleighCdf.
 * @param x - data
 * @param sigma - standard deviation
 * @returns - rayleigh cdf
 */
export default function rayleighCdf(x: number, sigma = 1): number {
  if (x < 0) {
    return 0;
  }
  return -Math.expm1(-(x ** 2) / (2 * sigma ** 2));
}
