import { expect, test } from 'vitest';

import { xAbsoluteSum } from '../index';

test('normal array', () => {
  const array = [-1, 2, -3, 4];

  expect(xAbsoluteSum(array)).toBe(10);
});

test('typed array', () => {
  const array = new Float64Array([-1, 2, -3, 4]);

  expect(xAbsoluteSum(array)).toBe(10);
});

test('typed array from to', () => {
  const array = new Float64Array([10, -1, 2, -3, 4, 20]);

  const fromIndex = 1;
  const toIndex = 4;

  expect(xAbsoluteSum(array, { fromIndex, toIndex })).toBe(10);
});
