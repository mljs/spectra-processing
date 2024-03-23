import { expect, test } from 'vitest';

import { xySortX } from '../xySortX';

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
