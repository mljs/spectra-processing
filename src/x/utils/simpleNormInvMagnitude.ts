/**
 * Applies the Rayleigh inverse cumulative distribution for a single value.
 * @param input - cumulative probability value.
 * @returns the inverse value for the Rayleigh distribution.
 */
export function simpleNormInvMagnitude(input: number): number {
  return -Math.sqrt(-2 * Math.log(1 - input));
}
