import { NumberArray } from 'cheminfo-types';

/**
 * Calculates the correlation between 2 vectors
 * https://en.wikipedia.org/wiki/Correlation_and_dependence
 * @param A - first array
 * @param B - sencond array
 */
export function xCorrelation(A: NumberArray, B: NumberArray): number {
  const n = A.length;
  let sumA = 0;
  let sumA2 = 0;
  let sumB = 0;
  let sumB2 = 0;
  let sumAB = 0;
  for (let i = 0; i < n; i++) {
    const a = A[i];
    const b = B[i];
    sumA += a;
    sumA2 += a ** 2;
    sumB += b;
    sumB2 += b ** 2;
    sumAB += a * b;
  }
  return (
    (n * sumAB - sumA * sumB) /
    (Math.sqrt(n * sumA2 - sumA ** 2) * Math.sqrt(n * sumB2 - sumB ** 2))
  );
}
