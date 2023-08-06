import { matrixMinMaxZ } from '../../index';

describe('matrixMinMaxZ', () => {
  it('basic', () => {
    const matrix = [
      [10, 3, 2, 2],
      [2, 2, 1, -3],
      [3, 1, 3, 15],
    ];
    const result = matrixMinMaxZ(matrix);
    expect(result).toStrictEqual({ min: -3, max: 15 });
  });
  it('zero', () => {
    const matrix = [[]];
    expect(() => {
      matrixMinMaxZ(matrix);
    }).toThrow('matrix should contain data');
  });
});
