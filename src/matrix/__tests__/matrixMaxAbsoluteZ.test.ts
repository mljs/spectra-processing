import { matrixMaxAbsoluteZ } from '../../index';

describe('matrixMaxAbsoluteZ', () => {
  it('basic', () => {
    const matrix = [
      [10, 3, 2, 2],
      [2, 2, 1, -3],
      [3, 1, 3, 15],
    ];
    const result = matrixMaxAbsoluteZ(matrix);
    expect(result).toBe(15);
  });
  it('large negative', () => {
    const matrix = [
      [10, 3, 2, 2],
      [2, 2, 1, -30],
      [3, 1, 3, 15],
    ];
    const result = matrixMaxAbsoluteZ(matrix);
    expect(result).toBe(30);
  });
  it('zero', () => {
    const matrix = [[]];
    expect(() => {
      matrixMaxAbsoluteZ(matrix);
    }).toThrow('matrixMaxAbsoluteZ requires at least 1 row and 1 column');
  });
});
