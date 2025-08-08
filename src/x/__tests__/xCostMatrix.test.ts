import { expect, test } from 'vitest';

import { xCostMatrix } from '../xCostMatrix';

const array1 = [1, 2, 3, 4, 5];
const array2 = [5, 4, 3, 2, 1];

test('default function', () => {
  const result = xCostMatrix(array1, array2);

  expect(result.to2DArray()).toMatchCloseTo([
    [4, 3, 2, 1, 0],
    [3, 2, 1, 0, 1],
    [2, 1, 0, 1, 2],
    [1, 0, 1, 2, 3],
    [0, 1, 2, 3, 4],
  ]);
});

test('diff function', () => {
  const result = xCostMatrix(array1, array2, { fct: (a, b) => a - b });

  expect(result.to2DArray()).toMatchCloseTo([
    [-4, -3, -2, -1, 0],
    [-3, -2, -1, 0, 1],
    [-2, -1, 0, 1, 2],
    [-1, 0, 1, 2, 3],
    [0, 1, 2, 3, 4],
  ]);
});
