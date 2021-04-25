import { matrixZRescale } from '../matrixZRescale';

describe('matrixZRescale', () => {
  it('default options', () => {
    const data = [
      [1, 3, 2, 2],
      [2, 2, 1, 3],
      [3, 1, 3, 1],
    ];
    let result = matrixZRescale(data);

    result = result.map((row) => Array.from(row));
    expect(result).toStrictEqual([
      [0, 1, 0.5, 0.5],
      [0.5, 0.5, 0, 1],
      [1, 0, 1, 0],
    ]);
  });
  it('min: -2, max: 3', () => {
    const data = [
      [1, 3, 2, 2],
      [2, 2, 1, 3],
      [3, 1, 3, 1],
    ];
    let result = matrixZRescale(data, { min: -2, max: 3 });

    result = result.map((row) => Array.from(row));
    expect(result).toStrictEqual([
      [-2, 3, 0.5, 0.5],
      [0.5, 0.5, -2, 3],
      [3, -2, 3, -2],
    ]);
  });
});
