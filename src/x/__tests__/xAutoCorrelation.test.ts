// Scilab: xcorr(linear)
import { xAutoCorrelation } from '../xAutoCorrelation';

test('auto-correlation linear function', () => {
  const linear = [0, 1, 2, 3, 4];
  const result = Float64Array.from([0, 4, 11, 20, 30, 20, 11, 4, 0]);
  expect(xAutoCorrelation(linear)).toStrictEqual(result);
});

// Scilab: xcorr(constant)
test('xAutoCorrelation constant function', () => {
  const constant = [5, 5, 5, 5, 5];
  const linear = [0, 1, 2, 3, 4];
  const result = Float64Array.from([25, 50, 75, 100, 125, 100, 75, 50, 25]);
  const result2 = Float64Array.from([0, 4, 11, 20, 30, 20, 11, 4, 0]);
  expect(xAutoCorrelation(constant)).toStrictEqual(result);
  expect(xAutoCorrelation(linear)).toStrictEqual(result2);
});

test('xAutoCorrelation constant tau=2', () => {
  const constant = [5, 5, 5, 5, 5];
  const linear = [0, 1, 2, 3, 4];
  const result = Float64Array.from([25, 75, 125, 75, 25]);
  const result2 = Float64Array.from([0, 11, 30, 11, 0]);
  expect(xAutoCorrelation(constant, { tau: 2 })).toStrictEqual(result);
  expect(xAutoCorrelation(linear, { tau: 2 })).toStrictEqual(result2);
});

// Scilab: xcorr(linear, maxlag=3);
// Scilab: xcorr(constant, maxlag=3)
test('xAutoCorrelation constant lag=4', () => {
  const constant = [5, 5, 5, 5, 5];
  const linear = [0, 1, 2, 3, 4];
  const result1 = Float64Array.from([50, 75, 100, 125, 100, 75, 50]);
  const result2 = Float64Array.from([4, 11, 20, 30, 20, 11, 4]);
  const result3 = Float64Array.from([75, 100, 125, 100, 75]);
  const result4 = Float64Array.from([11, 20, 30, 20, 11]);
  expect(xAutoCorrelation(constant, { lag: 3 })).toStrictEqual(result1);
  expect(xAutoCorrelation(linear, { lag: 3 })).toStrictEqual(result2);
  expect(xAutoCorrelation(constant, { lag: 2 })).toStrictEqual(result3);
  expect(xAutoCorrelation(linear, { lag: 2 })).toStrictEqual(result4);
});
