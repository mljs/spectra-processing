import { expect, test } from 'vitest';

import { xDoubleTypedArrayLength } from '../xDoubleTypedArrayLength.ts';

test('keeps the values and zeroes the added positions', () => {
  expect(
    xDoubleTypedArrayLength(Float64Array.from([1.5, -2, 3])),
  ).toStrictEqual(Float64Array.from([1.5, -2, 3, 0, 0, 0]));
});

test('returns an array of the same kind', () => {
  expect(xDoubleTypedArrayLength(Uint32Array.from([7, 8]))).toStrictEqual(
    Uint32Array.from([7, 8, 0, 0]),
  );
  expect(xDoubleTypedArrayLength(Int16Array.from([-4]))).toStrictEqual(
    Int16Array.from([-4, 0]),
  );
  expect(xDoubleTypedArrayLength(Uint8Array.from([255]))).toStrictEqual(
    Uint8Array.from([255, 0]),
  );
});

test('an empty array becomes one element long, so doubling progresses', () => {
  expect(xDoubleTypedArrayLength(new Float64Array(0))).toStrictEqual(
    new Float64Array(1),
  );
});

test('does not return the array it was given', () => {
  const array = Float64Array.from([1, 2]);

  expect(xDoubleTypedArrayLength(array)).not.toBe(array);
});
