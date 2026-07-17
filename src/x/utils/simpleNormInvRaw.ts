import erfcinv from './erfcinv.ts';

/**
 * Applies the inverse of the normal cumulative distribution for a single value.
 * @param input - cumulative probability value.
 * @returns the inverse value for the normal distribution.
 */
export function simpleNormInvRaw(input: number): number {
  return -1 * Math.SQRT2 * erfcinv(2 * input);
}
