import { expect, test } from 'vitest';

import { erfc } from '../erfc.ts';

test('should match the exact special values', () => {
  expect(erfc(0)).toBeCloseTo(1, 12);
  expect(erfc(Number.POSITIVE_INFINITY)).toBeCloseTo(0, 12);
  expect(erfc(Number.NEGATIVE_INFINITY)).toBeCloseTo(2, 12);
});

test('should respect the symmetry relation erfc(-x) = 2 - erfc(x)', () => {
  expect(erfc(-1)).toBeCloseTo(2 - erfc(1), 10);
  expect(erfc(-2)).toBeCloseTo(2 - erfc(2), 10);
});

test('should be monotone decreasing on the real line', () => {
  expect(erfc(0.5)).toBeGreaterThan(erfc(1));
  expect(erfc(1)).toBeGreaterThan(erfc(2));
});
