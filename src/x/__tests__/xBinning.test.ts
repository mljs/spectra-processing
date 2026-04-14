import { expect, test } from 'vitest';

import { xBinning } from '../xBinning.ts';

test('binSize 1 returns a copy', () => {
  const array = [1, 2, 3, 4];

  expect(xBinning(array, { binSize: 1 })).toStrictEqual(
    Float64Array.from([1, 2, 3, 4]),
  );
});

test('default keepFirstAndLast with even division', () => {
  const array = [1, 2, 3, 4, 5, 6];

  expect(xBinning(array, { binSize: 2 })).toStrictEqual(
    Float64Array.from([1, 2.5, 4.5, 6]),
  );
  expect(xBinning(array, { binSize: 3 })).toStrictEqual(
    Float64Array.from([1, 3, 5, 6]),
  );
});

test('default keepFirstAndLast with uneven division', () => {
  const array = [1, 2, 3, 4, 5, 6, 7];

  expect(xBinning(array, { binSize: 3 })).toStrictEqual(
    Float64Array.from([1, 3, 5.5, 7]),
  );
});

test('accepts Float64Array input', () => {
  const array = Float64Array.from([2, 4, 6, 8]);

  expect(xBinning(array, { binSize: 2 })).toStrictEqual(
    Float64Array.from([2, 5, 8]),
  );
});

test('default binSize is 10', () => {
  const array = Array.from({ length: 25 }, (_, i) => i + 1);

  expect(xBinning(array)).toStrictEqual(
    Float64Array.from([1, 6.5, 16.5, 23, 25]),
  );
});

test('keepFirstAndLast=false restores pure binning', () => {
  const array = [1, 2, 3, 4, 5, 6];

  expect(
    xBinning(array, { binSize: 2, keepFirstAndLast: false }),
  ).toStrictEqual(Float64Array.from([1.5, 3.5, 5.5]));
  expect(
    xBinning(array, { binSize: 3, keepFirstAndLast: false }),
  ).toStrictEqual(Float64Array.from([2, 5]));
});

test('keepFirstAndLast=false with uneven division', () => {
  const array = [1, 2, 3, 4, 5, 6, 7];

  expect(
    xBinning(array, { binSize: 3, keepFirstAndLast: false }),
  ).toStrictEqual(Float64Array.from([2, 5, 7]));
});

test('throws on invalid binSize', () => {
  expect(() => xBinning([1, 2, 3], { binSize: 0 })).toThrow(
    /binSize must be a positive integer/,
  );
  expect(() => xBinning([1, 2, 3], { binSize: 1.5 })).toThrow(
    /binSize must be a positive integer/,
  );
  expect(() => xBinning([1, 2, 3], { binSize: -2 })).toThrow(
    /binSize must be a positive integer/,
  );
});

test('throws on empty input', () => {
  expect(() => xBinning([], { binSize: 2 })).toThrow(/input must not be empty/);
});

test('length <= 2 returns a copy', () => {
  expect(xBinning([1, 2], { binSize: 2 })).toStrictEqual(
    Float64Array.from([1, 2]),
  );
  expect(xBinning([5], { binSize: 2 })).toStrictEqual(Float64Array.from([5]));
});

test('numberOfPoints splits into N bins', () => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  expect(
    xBinning(array, { numberOfPoints: 5, keepFirstAndLast: false }),
  ).toStrictEqual(Float64Array.from([1.5, 3.5, 5.5, 7.5, 9.5]));
});

test('numberOfPoints with uneven split', () => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  expect(
    xBinning(array, { numberOfPoints: 3, keepFirstAndLast: false }),
  ).toStrictEqual(Float64Array.from([2, 5, 8.5]));
});

test('numberOfPoints with keepFirstAndLast', () => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  expect(xBinning(array, { numberOfPoints: 5 })).toStrictEqual(
    Float64Array.from([1, 2.5, 5, 8, 10]),
  );
});

test('numberOfPoints throws when > length', () => {
  expect(() => xBinning([1, 2, 3], { numberOfPoints: 4 })).toThrow(
    /numberOfPoints must be <= array.length/,
  );
});

test('numberOfPoints throws when not a positive integer', () => {
  expect(() => xBinning([1, 2, 3], { numberOfPoints: 0 })).toThrow(
    /numberOfPoints must be a positive integer/,
  );
  expect(() => xBinning([1, 2, 3], { numberOfPoints: 2.5 })).toThrow(
    /numberOfPoints must be a positive integer/,
  );
});

test('binSize and numberOfPoints are mutually exclusive', () => {
  expect(() =>
    xBinning([1, 2, 3, 4], { binSize: 2, numberOfPoints: 2 }),
  ).toThrow(/mutually exclusive/);
});

test('numberOfPoints=2 with keepFirstAndLast returns endpoints', () => {
  expect(xBinning([1, 2, 3, 4, 5], { numberOfPoints: 2 })).toStrictEqual(
    Float64Array.from([1, 5]),
  );
});

test('numberOfPoints < 2 with keepFirstAndLast throws', () => {
  expect(() => xBinning([1, 2, 3], { numberOfPoints: 1 })).toThrow(
    /numberOfPoints must be >= 2 when keepFirstAndLast is true/,
  );
});

test('numberOfPoints=1 with keepFirstAndLast=false averages entire array', () => {
  expect(
    xBinning([1, 2, 3, 4, 5], {
      numberOfPoints: 1,
      keepFirstAndLast: false,
    }),
  ).toStrictEqual(Float64Array.from([3]));
});
