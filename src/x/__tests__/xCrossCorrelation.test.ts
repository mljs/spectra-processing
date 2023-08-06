import { xCrossCorrelation } from '../../index';

describe('xCrossCorrelation', () => {
  it('cross-correlation linear and constant function', () => {
    const linear = [0, 1, 2, 3, 4];
    const constant = [5, 5, 5, 5, 5];
    const result1 = [0, 5, 15, 30, 50, 50, 45, 35, 20];
    const result2 = [20, 35, 45, 50, 50, 30, 15, 5, 0];
    // Scilab: xcorr(linear, constant)
    expect(Array.from(xCrossCorrelation(linear, constant))).toStrictEqual(
      result1,
    );
    // Scilab: xcorr(constant, linear)
    expect(Array.from(xCrossCorrelation(constant, linear))).toStrictEqual(
      result2,
    );
  });
  // Scilab: xcorr(constant, linear, maxlag=3);
  it('lag and tau options', () => {
    const linear = [0, 1, 2, 3, 4];
    const constant = [5, 5, 5, 5, 5];
    const result1 = [0, 15, 50, 45, 20];
    const result2 = [35, 45, 50, 50, 30, 15, 5];
    const result3 = [45, 50, 50, 30, 15];
    expect(
      Array.from(xCrossCorrelation(linear, constant, { tau: 2 })),
    ).toStrictEqual(result1);
    expect(
      Array.from(xCrossCorrelation(constant, linear, { lag: 3 })),
    ).toStrictEqual(result2);
    expect(
      Array.from(xCrossCorrelation(constant, linear, { lag: 2 })),
    ).toStrictEqual(result3);
  });
});
