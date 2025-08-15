import { expect, test } from 'vitest';

import { xySortX } from '../xySortX.ts';

test('unsorted', () => {
  const data = {
    x: [5, 3, 6, 7, 1, 3, 5],
    y: [1, 2, 3, 4, 5, 6, 7],
  };

  const result = xySortX(data);

  expect(result).toStrictEqual({
    x: Float64Array.from([1, 3, 3, 5, 5, 6, 7]),
    y: Float64Array.from([5, 2, 6, 1, 7, 3, 4]),
  });
});

test('sorted', () => {
  const data = {
    x: [1, 2, 3],
    y: [1, 2, 3],
  };

  const result = xySortX(data);

  expect(result).toStrictEqual({
    x: Float64Array.from([1, 2, 3]),
    y: Float64Array.from([1, 2, 3]),
  });
});

test('sorted reverse', () => {
  const data = {
    x: [3, 2, 1],
    y: [1, 2, 3],
  };

  const result = xySortX(data);

  expect(result).toStrictEqual({
    x: Float64Array.from([1, 2, 3]),
    y: Float64Array.from([3, 2, 1]),
  });
});

test('typed XY arrays', () => {
  const data = {
    x: Float64Array.from([
      1.557, 1.265, 1.535, 1.622, 2, 1.426, 1.094, 1.201, 1.825,
    ]),
    y: Float64Array.from([0, 1, 2, 5, 6, 7, 8, 9, 10]),
  };
  const result = xySortX(data);

  expect(result).toStrictEqual({
    x: Float64Array.from([
      1.094, 1.201, 1.265, 1.426, 1.535, 1.557, 1.622, 1.825, 2,
    ]),
    y: Float64Array.from([8, 9, 1, 7, 2, 0, 5, 10, 6]),
  });
});
