import { crossCorrelation } from '../crossCorrelation';

describe('crossCorrelation', function () {
  // Scilab: xcorr(linear)
  it('auto-correlation linear function', () => {
    let linear = [0, 1, 2, 3, 4];
    let result = [0, 4, 11, 20, 30, 20, 11, 4, 0];
    expect(crossCorrelation(linear, linear)).toStrictEqual(result);
  });

  // Scilab: xcorr(constant)
  it('autocorrelation constant function', () => {
    let constant = [5, 5, 5, 5, 5];
    let result = [25, 50, 75, 100, 125, 100, 75, 50, 25];
    expect(crossCorrelation(constant, constant)).toStrictEqual(result);
  });
  // Scilab: xcorr(linear, constant)
  // Scilab: xcorr(constant, linear)
  it('cross-correlation linear and constant function', () => {
    let linear = [0, 1, 2, 3, 4];
    let constant = [5, 5, 5, 5, 5];
    let result1 = [0, 5, 15, 30, 50, 50, 45, 35, 20];
    let result2 = [20, 35, 45, 50, 50, 30, 15, 5, 0];
    expect(crossCorrelation(linear, constant)).toStrictEqual(result1);
    expect(crossCorrelation(constant, linear)).toStrictEqual(result2);
  });
});
