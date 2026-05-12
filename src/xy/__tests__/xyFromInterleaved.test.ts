import { expect, test } from 'vitest';

import { xyFromInterleaved } from '../index.ts';

test('basic', () => {
  expect(xyFromInterleaved([1, 10, 2, 20, 3, 30])).toStrictEqual({
    x: [1, 2, 3],
    y: [10, 20, 30],
  });
});

test('Float64Array input', () => {
  expect(xyFromInterleaved(new Float64Array([1, 10, 2, 20]))).toStrictEqual({
    x: [1, 2],
    y: [10, 20],
  });
});

test('empty array', () => {
  expect(xyFromInterleaved([])).toStrictEqual({ x: [], y: [] });
});
