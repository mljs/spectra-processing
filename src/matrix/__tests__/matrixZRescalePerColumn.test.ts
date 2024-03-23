import { expect, test } from 'vitest';

import { matrixZRescalePerColumn } from '../../index';

test('default options', () => {
  const data = [
    [1, 3, 2, 2],
    [2, 2, 1, 3],
    [3, 1, 3, 1],
  ];
  const result = matrixZRescalePerColumn(data);
  expect(result).toStrictEqual([
    Float64Array.from([0, 1, 0.5, 0.5]),
    Float64Array.from([0.5, 0.5, 0, 1]),
    Float64Array.from([1, 0, 1, 0]),
  ]);
});

test('min: -2, max: 3', () => {
  const data = [
    [1, 3, 2, 2],
    [2, 2, 1, 3],
    [3, 1, 3, 1],
  ];
  const result = matrixZRescalePerColumn(data, { min: -2, max: 3 });
  expect(result).toStrictEqual([
    Float64Array.from([-2, 3, 0.5, 0.5]),
    Float64Array.from([0.5, 0.5, -2, 3]),
    Float64Array.from([3, -2, 3, -2]),
  ]);
});
