import { expect, test } from 'vitest';

import { matrixAutoCorrelation } from '../matrixAutoCorrelation';

test('simple', () => {
  const matrix = [
    [1, 3],
    [2, 2],
    [3, 1],
  ];
  const result = matrixAutoCorrelation(matrix);
  expect(result[0]).toBeCloseTo(1, 10);
  expect(result[1]).toBeCloseTo(-1, 10);
});

test('test matrixAutoCorrelation too small', () => {
  const matrix = [[0]];
  expect(() => matrixAutoCorrelation(matrix)).toThrow(
    'can not calculate info if matrix contains less than 2 rows',
  );
});
