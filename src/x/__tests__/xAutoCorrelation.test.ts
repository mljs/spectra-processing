import { xAutoCorrelation } from '../../index';

describe('xCrossCorrelation', () => {
  // Scilab: xcorr(linear)
  it('auto-correlation linear function', () => {
    const linear = [0, 1, 2, 3, 4];
    const result = [0, 4, 11, 20, 30, 20, 11, 4, 0];
    expect(Array.from(xAutoCorrelation(linear))).toStrictEqual(result);
  });

  // Scilab: xcorr(constant)
  it('xAutoCorrelation constant function', () => {
    const constant = [5, 5, 5, 5, 5];
    const linear = [0, 1, 2, 3, 4];
    const result = [25, 50, 75, 100, 125, 100, 75, 50, 25];
    const result2 = [0, 4, 11, 20, 30, 20, 11, 4, 0];
    expect(Array.from(xAutoCorrelation(constant))).toStrictEqual(result);
    expect(Array.from(xAutoCorrelation(linear))).toStrictEqual(result2);
  });

  it('xAutoCorrelation constant tau=2', () => {
    const constant = [5, 5, 5, 5, 5];
    const linear = [0, 1, 2, 3, 4];
    const result = [25, 75, 125, 75, 25];
    const result2 = [0, 11, 30, 11, 0];
    expect(Array.from(xAutoCorrelation(constant, { tau: 2 }))).toStrictEqual(
      result,
    );
    expect(Array.from(xAutoCorrelation(linear, { tau: 2 }))).toStrictEqual(
      result2,
    );
  });
  // Scilab: xcorr(linear, maxlag=3);
  // Scilab: xcorr(constant, maxlag=3)
  it('xAutoCorrelation constant lag=4', () => {
    const constant = [5, 5, 5, 5, 5];
    const linear = [0, 1, 2, 3, 4];
    const result1 = [50, 75, 100, 125, 100, 75, 50];
    const result2 = [4, 11, 20, 30, 20, 11, 4];
    const result3 = [75, 100, 125, 100, 75];
    const result4 = [11, 20, 30, 20, 11];
    expect(Array.from(xAutoCorrelation(constant, { lag: 3 }))).toStrictEqual(
      result1,
    );
    expect(Array.from(xAutoCorrelation(linear, { lag: 3 }))).toStrictEqual(
      result2,
    );
    expect(Array.from(xAutoCorrelation(constant, { lag: 2 }))).toStrictEqual(
      result3,
    );
    expect(Array.from(xAutoCorrelation(linear, { lag: 2 }))).toStrictEqual(
      result4,
    );
  });
});
