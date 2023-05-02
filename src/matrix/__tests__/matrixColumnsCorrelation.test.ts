import { toMatchCloseTo } from 'jest-matcher-deep-close-to';

import { matrixColumnsCorrelation } from '../../index';

expect.extend({ toMatchCloseTo });

test('matrixColumnsCorrelation', () => {
  let data: number[][] = [
    [1, 3, 1, 3],
    [2, 2, 2, 2],
    [3, 1, 3, 1],
  ];
  let result = matrixColumnsCorrelation(data);
  for (let i = 0; i < result.length; i++) {
    result[i] = Array.from(result[i]);
  }
  expect(result).toMatchCloseTo([
    [1, -1, 1, -1],
    [-1, 1, -1, 1],
    [1, -1, 1, -1],
    [-1, 1, -1, 1],
  ]);
});
