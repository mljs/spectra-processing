import { expect, test } from 'vitest';

import { createRandomArray } from '../../utils/index.ts';
import { xMedianAbsoluteDeviation } from '../xMedianAbsoluteDeviation.ts';

test('basic example', () => {
  const result = xMedianAbsoluteDeviation([1, 1, 2, 2, 4, 6, 9]);

  expect(result.median).toBe(2);
  expect(result.mad).toBe(1);
});

test('noisy example', () => {
  const array = createRandomArray({ mean: 0, seed: 0 });
  const result = xMedianAbsoluteDeviation(array);

  expect(result.median).toBeCloseTo(0, 1);
  expect(result.mad).toBeCloseTo(0.6929);
});

test('noisy shifted example', () => {
  const array = createRandomArray({ mean: 10, seed: 0 });
  const result = xMedianAbsoluteDeviation(array);

  expect(result.median).toBeCloseTo(10, 1);
  expect(result.mad).toBeCloseTo(0.6929);
});
