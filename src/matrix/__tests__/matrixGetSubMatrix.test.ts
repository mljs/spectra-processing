import { expect, test } from 'vitest';

import { matrixGetSubMatrix } from '../matrixGetSubMatrix';

test('should extract submatrix correctly without duplication', () => {
  const matrix = [
    new Float64Array([1, 2, 3]),
    new Float64Array([4, 5, 6]),
    new Float64Array([7, 8, 9]),
  ];
  const options = {
    startRow: 0,
    startColumn: 1,
    endRow: 1,
    endColumn: 2,
    duplicate: false,
  };

  const subMatrix = matrixGetSubMatrix(matrix, options);
  const expectedResult = [new Float64Array([2, 3]), new Float64Array([5, 6])];
  expect(subMatrix).toEqual(expectedResult);

  subMatrix[0][0] = 10;
  expect(matrix[0][1]).toBe(10);
});

test('should extract submatrix correctly with duplication', () => {
  const matrix = [
    new Float64Array([1, 2, 3]),
    new Float64Array([4, 5, 6]),
    new Float64Array([7, 8, 9]),
  ];
  const options = {
    startRow: 0,
    startColumn: 1,
    endRow: 1,
    endColumn: 2,
    duplicate: true,
  };

  const subMatrix = matrixGetSubMatrix(matrix, options);
  const expectedResult = [new Float64Array([2, 3]), new Float64Array([5, 6])];
  expect(subMatrix).toEqual(expectedResult);

  subMatrix[0][0] = 10;
  expect(matrix[0][1]).toBe(2);
});

test('should throw RangeError for out-of-range indices', () => {
  const matrix = [
    new Float64Array([1, 2, 3]),
    new Float64Array([4, 5, 6]),
    new Float64Array([7, 8, 9]),
  ];
  const options = {
    startRow: 0,
    startColumn: 1,
    endRow: 3, // Out of range
    endColumn: 2,
    duplicate: true,
  };

  expect(() => matrixGetSubMatrix(matrix, options)).toThrow(RangeError);
});
