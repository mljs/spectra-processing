import { expect, test } from 'vitest';

import { xCrossCorrelation } from '../xCrossCorrelation';

test('cross-correlation linear and constant function', () => {
  const linear = [0, 1, 2, 3, 4];
  const constant = [5, 5, 5, 5, 5];
  const result1 = Float64Array.from([0, 5, 15, 30, 50, 50, 45, 35, 20]);
  const result2 = Float64Array.from([20, 35, 45, 50, 50, 30, 15, 5, 0]);

  // Scilab: xcorr(linear, constant)
  expect(xCrossCorrelation(linear, constant)).toStrictEqual(result1);
  // Scilab: xcorr(constant, linear)
  expect(xCrossCorrelation(constant, linear)).toStrictEqual(result2);
});

// Scilab: xcorr(constant, linear, maxlag=3);
test('lag and tau options', () => {
  const linear = [0, 1, 2, 3, 4];
  const constant = [5, 5, 5, 5, 5];
  const result1 = Float64Array.from([0, 15, 50, 45, 20]);
  const result2 = Float64Array.from([35, 45, 50, 50, 30, 15, 5]);
  const result3 = Float64Array.from([45, 50, 50, 30, 15]);

  expect(xCrossCorrelation(linear, constant, { tau: 2 })).toStrictEqual(
    result1,
  );
  expect(xCrossCorrelation(constant, linear, { lag: 3 })).toStrictEqual(
    result2,
  );
  expect(xCrossCorrelation(constant, linear, { lag: 2 })).toStrictEqual(
    result3,
  );
});
