import { matrixMinMaxAbsoluteZ } from '../matrixMinMaxAbsoluteZ';

describe('matrixMinMaxAbsoluteZ', () => {
  it('basic', () => {
    const matrix = [
      [10, 3, 2, 2],
      [2, 2, 1, -3],
      [3, 1, 3, 15],
    ];
    let result = matrixMinMaxAbsoluteZ(matrix);
    expect(result).toStrictEqual({ min: 1, max: 15 });
  });
  it('zero', () => {
    const matrix = [[]];
    expect(matrixMinMaxAbsoluteZ(matrix)).toStrictEqual({
      min: undefined,
      max: undefined,
    });
  });
});
