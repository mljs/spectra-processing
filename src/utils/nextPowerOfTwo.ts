/**
 * Get the size of the next power of two.
 * @param n
 */
export function nextPowerOfTwo(n: number): number {
  if (n === 0) return 1;
  n--;
  n |= n >> 1;
  n |= n >> 2;
  n |= n >> 4;
  n |= n >> 8;
  n |= n >> 16;
  return n + 1;
}
