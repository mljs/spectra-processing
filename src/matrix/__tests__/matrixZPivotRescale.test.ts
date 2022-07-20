import { matrixZPivotRescale } from '../matrixZPivotRescale';

describe('matrixZPivotRescale', () => {
  it('only positive number', () => {
    const data = [
      [1, 3, 2, 2],
      [2, 2, 1, 3],
      [3, 1, 3, 1],
    ];
    let result = matrixZPivotRescale(data, { max: 30 });

    result = result.map((row) => Array.from(row));
    expect(result).toStrictEqual([
      [10, 30, 20, 20],
      [20, 20, 10, 30],
      [30, 10, 30, 10],
    ]);
  });

  it('with negative larger number', () => {
    const data = [
      [-1, -3, 2, 2],
      [2, 2, 1, -3],
      [-3, 1, -3, 1],
    ];
    let result = matrixZPivotRescale(data, { max: 30 });

    result = result.map((row) => Array.from(row));
    expect(result).toStrictEqual([
      [-10, -30, 20, 20],
      [20, 20, 10, -30],
      [-30, 10, -30, 10],
    ]);
  });
});
