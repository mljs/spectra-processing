import { matrixGetSubMatrix } from '../matrixGetSubMatrix';

describe('matrixGetSubMatrix', () => {
  const matrix = [
    new Float64Array([1, 2, 3]),
    new Float64Array([4, 5, 6]),
    new Float64Array([7, 8, 9]),
  ];

  it('should extract submatrix correctly', () => {
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

  it('should throw RangeError for out-of-range indices', () => {
    const options = {
      startRow: 0,
      startColumn: 1,
      endRow: 3, // Out of range
      endColumn: 2,
    };

    expect(() => matrixGetSubMatrix(matrix, options)).toThrow(RangeError);
  });
});
