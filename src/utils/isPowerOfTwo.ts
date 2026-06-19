/**
 * Check if a number is a power of two.
 * @param n - input number.
 */
export function isPowerOfTwo(n: number): boolean {
  return n !== 0 && (n & (n - 1)) === 0;
}
