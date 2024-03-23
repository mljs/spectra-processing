import { expect, test } from 'vitest';

import { matrixToArray } from '../matrixToArray';

test('matrixToArray', () => {
  const matrix = [
    [1, 2],
    [3, 4],
  ];
  const result = matrixToArray(matrix);
  expect(result).toStrictEqual(new Float64Array([1, 2, 3, 4]));
});
