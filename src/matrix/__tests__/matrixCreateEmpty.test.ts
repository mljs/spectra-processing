import { expect, test } from 'vitest';

import { matrixCreateEmpty } from '../matrixCreateEmpty';

test('matrixCreateEmpty with default constructor', () => {
  const matrix = matrixCreateEmpty({
    nbColumns: 2,
    nbRows: 3,
  });

  expect(matrix).toHaveLength(3);
  expect(matrix[0]).toHaveLength(2);
  expect(matrix[0]).toBeInstanceOf(Float64Array);

  expect(matrix).toStrictEqual([
    new Float64Array(2),
    new Float64Array(2),
    new Float64Array(2),
  ]);
});

test('matrixCreateEmpty with Array constructor', () => {
  const matrix = matrixCreateEmpty({
    nbColumns: 2,
    nbRows: 3,
    ArrayConstructor: Array,
  });

  expect(matrix).toHaveLength(3);
  expect(matrix[0]).toHaveLength(2);
  expect(matrix[0]).toBeInstanceOf(Array);

  expect(matrix).toStrictEqual([
    [0, 0],
    [0, 0],
    [0, 0],
  ]);
});

test('matrixCreateEmpty with Int16Array constructor', () => {
  const matrix = matrixCreateEmpty({
    nbColumns: 2,
    nbRows: 3,
    ArrayConstructor: Int16Array,
  });

  expect(matrix).toHaveLength(3);
  expect(matrix[0]).toHaveLength(2);
  expect(matrix[0]).toBeInstanceOf(Int16Array);

  expect(matrix).toStrictEqual([
    Int16Array.from([0, 0]),
    Int16Array.from([0, 0]),
    Int16Array.from([0, 0]),
  ]);
});
