import { autoCorrelation } from '../autoCorrelation';

describe('crossCorrelation', function() {
  // Scilab: xcorr(linear)
  it('auto-correlation linear function', () => {
    let linear = [0, 1, 2, 3, 4];
    let result = [0, 4, 11, 20, 30, 20, 11, 4, 0];
    expect(autoCorrelation(linear)).toStrictEqual(result);
  });

  // Scilab: xcorr(constant)
  it('autocorrelation constant function', () => {
    let constant = [5, 5, 5, 5, 5];
    let linear = [0, 1, 2, 3, 4];
    let result = [25, 50, 75, 100, 125, 100, 75, 50, 25];
    let result2 = [0, 4, 11, 20, 30, 20, 11, 4, 0];
    expect(autoCorrelation(constant)).toStrictEqual(result);
    expect(autoCorrelation(linear)).toStrictEqual(result2);
  });

  it('autocorrelation constant tau = 2', () => {
    let constant = [5, 5, 5, 5, 5];
    let linear = [0, 1, 2, 3, 4];
    let result = [25, 75, 125, 75, 25];
    let result2 = [0, 11, 30, 11, 0];
    expect(autoCorrelation(constant, { tau: 2 })).toStrictEqual(result);
    expect(autoCorrelation(linear, { tau: 2 })).toStrictEqual(result2);
  });
  // Scilab: xcorr(linear, maxlag = 3);
  // Scilab: xcorr(constant, maxlag = 3)
  it('autocorrelation constant lag = 4', () => {
    let constant = [5, 5, 5, 5, 5];
    let linear = [0, 1, 2, 3, 4];
    let result = [50, 75, 100, 125, 100, 75, 50];
    let result2 = [4, 11, 20, 30, 20, 11, 4];
    expect(autoCorrelation(constant, { lag: 3 })).toStrictEqual(result);
    expect(autoCorrelation(linear, { lag: 3 })).toStrictEqual(result2);
  });
});
