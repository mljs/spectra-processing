import { matrixGetSubMatrix } from '../matrixGetSubMatrix';

test('should extract submatrix correctly', () => {
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
  };

  const subMatrix = matrixGetSubMatrix(matrix, options);
  const expectedResult = [new Float64Array([2, 3]), new Float64Array([5, 6])];
  expect(subMatrix).toEqual(expectedResult);
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
  };

  expect(() => matrixGetSubMatrix(matrix, options)).toThrow(RangeError);
});
