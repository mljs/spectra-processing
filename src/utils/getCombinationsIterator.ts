/**
 * Generate all combinations of choosing k items from n items as an iterator.
 * Useful for large combination sets to avoid storing all combinations in memory.
 * @param n - Total number of items.
 * @param k - Number of items to choose.
 * @yields Each combination as an array of indices.
 */

export function* getCombinationsIterator(
  n: number,
  k: number,
): Generator<number[], void, undefined> {
  if (k === 0) {
    yield [];
    return;
  }
  if (k > n) return;

  const current: number[] = [];

  function* backtrack(start: number): Generator<number[], void, undefined> {
    if (current.length === k) {
      yield [...current];
      return;
    }

    for (let i = start; i < n; i++) {
      current.push(i);
      yield* backtrack(i + 1);
      current.pop();
    }
  }

  yield* backtrack(0);
}
