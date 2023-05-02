import { matrixAutoCorrelation } from '../../index';

describe('matrixAutoCorrelation', () => {
  it('simple', () => {
    const matrix = [
      [1, 3],
      [2, 2],
      [3, 1],
    ];
    const result = matrixAutoCorrelation(matrix);
    expect(result[0]).toBeCloseTo(1, 10);
    expect(result[1]).toBeCloseTo(-1, 10);
  });

  it('test matrixAutoCorrelation too small', () => {
    const matrix = [[0]];
    expect(() => matrixAutoCorrelation(matrix)).toThrow(
      'matrixAutoCorrelation: can not calculate info if matrix contains less than 2 rows',
    );
  });
});
