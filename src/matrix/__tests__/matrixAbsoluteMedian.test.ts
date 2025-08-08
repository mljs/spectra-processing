import { expect, test } from 'vitest';

import { matrixAbsoluteMedian } from '../matrixAbsoluteMedian';

test('matrixAbsoluteMedian', () => {
  const matrix = [
    [-1, -2, -3],
    [1, 2, 3],
  ];
  const absoluteMedian = matrixAbsoluteMedian(matrix);

  expect(absoluteMedian).toBe(2);
});
