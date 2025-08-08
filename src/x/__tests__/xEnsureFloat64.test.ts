import { expect, test } from 'vitest';

import { xEnsureFloat64 } from '../xEnsureFloat64';

test('normal array', () => {
  const array = [-1, 2, -3, 4];
  const float64 = xEnsureFloat64(array);
  float64[0] = 0;

  expect(float64).toBeInstanceOf(Float64Array);
  expect(array).toStrictEqual([-1, 2, -3, 4]);
  expect(float64).toStrictEqual(Float64Array.from([0, 2, -3, 4]));
});

test('typed array', () => {
  const array = new Float64Array([-1, 2, -3, 4]);
  const float64 = xEnsureFloat64(array);
  float64[0] = 0;

  expect(float64).toBeInstanceOf(Float64Array);
  expect(array).toStrictEqual(Float64Array.from([-1, 2, -3, 4]));
  expect(float64).toStrictEqual(Float64Array.from([0, 2, -3, 4]));
});
