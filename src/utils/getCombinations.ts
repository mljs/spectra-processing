/**
 * Generate all combinations of choosing k items from n items.
 * @param n - Total number of items.
 * @param k - Number of items to choose.
 * @returns Array of combinations, where each combination is an array of indices.
 */
export function getCombinations(n: number, k: number): number[][] {
  if (k === 0) return [[]];
  if (k > n) return [];

  const results: number[][] = [];
  const current: number[] = [];

  function backtrack(start: number): void {
    if (current.length === k) {
      results.push([...current]);
      return;
    }

    for (let i = start; i < n; i++) {
      current.push(i);
      backtrack(i + 1);
      current.pop();
    }
  }

  backtrack(0);
  return results;
}
