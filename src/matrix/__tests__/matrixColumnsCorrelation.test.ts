import { expect, test } from 'vitest';

import { matrixColumnsCorrelation } from '../matrixColumnsCorrelation';

test('matrixColumnsCorrelation', () => {
  const data: number[][] = [
    [1, 3, 1, 3],
    [2, 2, 2, 2],
    [3, 1, 3, 1],
  ];
  const result = matrixColumnsCorrelation(data);

  expect(result).toMatchCloseTo([
    Float64Array.from([1, -1, 1, -1]),
    Float64Array.from([-1, 1, -1, 1]),
    Float64Array.from([1, -1, 1, -1]),
    Float64Array.from([-1, 1, -1, 1]),
  ]);
});
