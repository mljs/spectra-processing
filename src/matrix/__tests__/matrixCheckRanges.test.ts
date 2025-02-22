import { matrixCheckRanges } from '../matrixCheckRanges';

test('should not throw error for valid indices', () => {
  // Define a sample matrix
  const matrix = [
    new Float64Array([1, 2, 3]),
    new Float64Array([4, 5, 6]),
    new Float64Array([7, 8, 9]),
  ];

  // Define options with valid indices
  const options = {
    startRow: 0,
    startColumn: 0,
    endRow: 2,
    endColumn: 2,
  };

  expect(() => matrixCheckRanges(matrix, options)).not.toThrow();
});

test('should throw RangeError for out-of-range indices', () => {
  // Define a sample matrix
  const matrix = [
    new Float64Array([1, 2, 3]),
    new Float64Array([4, 5, 6]),
    new Float64Array([7, 8, 9]),
  ];

  // Define options with out-of-range indices
  const options = {
    startRow: 0,
    startColumn: 0,
    endRow: 3, // Out of range
    endColumn: 2,
  };

  // Call the function and expect test to throw RangeError
  expect(() => matrixCheckRanges(matrix, options)).toThrow(RangeError);
});
