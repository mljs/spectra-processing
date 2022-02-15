import { matrixMinMaxZ } from '../matrixMinMaxZ';

describe('matrixMinMaxZ', () => {
  it('basic', () => {
    const matrix = [
      [10, 3, 2, 2],
      [2, 2, 1, -3],
      [3, 1, 3, 15],
    ];
    let result = matrixMinMaxZ(matrix);
    expect(result).toStrictEqual({ min: -3, max: 15 });
  });
  it('zero', () => {
    const matrix = [[]];
    expect(() => {
      matrixMinMaxZ(matrix);
    }).toThrow('matrixMinMaxZ requires at least 1 row and 1 column');
  });
});
