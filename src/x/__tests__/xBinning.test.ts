import { expect, test } from 'vitest';

import { xBinning } from '../xBinning.ts';

test('binSize 1 returns a copy', () => {
  const array = [1, 2, 3, 4];

  expect(xBinning(array, 1)).toStrictEqual(Float64Array.from([1, 2, 3, 4]));
});

test('even division', () => {
  const array = [1, 2, 3, 4, 5, 6];

  expect(xBinning(array, 2)).toStrictEqual(Float64Array.from([1.5, 3.5, 5.5]));
  expect(xBinning(array, 3)).toStrictEqual(Float64Array.from([2, 5]));
});

test('uneven division averages remaining points', () => {
  const array = [1, 2, 3, 4, 5, 6, 7];

  expect(xBinning(array, 3)).toStrictEqual(Float64Array.from([2, 5, 7]));
});

test('accepts Float64Array input', () => {
  const array = Float64Array.from([2, 4, 6, 8]);

  expect(xBinning(array, 2)).toStrictEqual(Float64Array.from([3, 7]));
});

test('throws on invalid binSize', () => {
  expect(() => xBinning([1, 2, 3], 0)).toThrow(
    /binSize must be a positive integer/,
  );
  expect(() => xBinning([1, 2, 3], 1.5)).toThrow(
    /binSize must be a positive integer/,
  );
  expect(() => xBinning([1, 2, 3], -2)).toThrow(
    /binSize must be a positive integer/,
  );
});

test('throws on empty input', () => {
  expect(() => xBinning([], 2)).toThrow(/input must not be empty/);
});
