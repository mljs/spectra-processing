import { xCrossCorrelation } from '../xCrossCorrelation';

describe('xCrossCorrelation', () => {
  it('cross-correlation linear and constant function', () => {
    let linear = [0, 1, 2, 3, 4];
    let constant = [5, 5, 5, 5, 5];
    let result1 = [0, 5, 15, 30, 50, 50, 45, 35, 20];
    let result2 = [20, 35, 45, 50, 50, 30, 15, 5, 0];
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
    let linear = [0, 1, 2, 3, 4];
    let constant = [5, 5, 5, 5, 5];
    let result1 = [0, 15, 50, 45, 20];
    let result2 = [35, 45, 50, 50, 30, 15, 5];
    let result3 = [45, 50, 50, 30, 15];
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
