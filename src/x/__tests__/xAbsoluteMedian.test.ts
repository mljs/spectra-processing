import { expect, test } from 'vitest';

import { xAbsoluteMedian } from '../xAbsoluteMedian';

test('positive values', () => {
  const array = [1, 2, 3, 4, 5];

  expect(xAbsoluteMedian(array)).toBe(3);
});

test('mixed values', () => {
  const array = [1, -2, 3, -4, 5];

  expect(xAbsoluteMedian(array)).toBe(3);
});
