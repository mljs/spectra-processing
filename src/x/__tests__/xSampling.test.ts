import { expect, test } from 'vitest';

import { xSampling } from '../xSampling.ts';

test('testing on array', () => {
  const array = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const result = xSampling(array, { length: 3 });

  expect(result).toStrictEqual(Float64Array.from([0, 4, 8]));
});

test('testing same length', () => {
  const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const result = xSampling(array);

  expect(result).toStrictEqual(Float64Array.from(array));
});

test('testing on array where nbPoints does not divide the length of the array', () => {
  const array = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const result = xSampling(array, { length: 4 });

  expect(result).toStrictEqual(Float64Array.from([0, 3, 5, 8]));
});
