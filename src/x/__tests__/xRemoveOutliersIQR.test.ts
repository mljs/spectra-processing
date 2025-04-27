import { expect, test } from 'vitest';

import { xRemoveOutliersIQR } from '../xRemoveOutliersIQR';

test('[]', () => {
  expect(xRemoveOutliersIQR([])).toStrictEqual([]);
});

test('[1]', () => {
  expect(xRemoveOutliersIQR([1])).toStrictEqual([1]);
});

test('[1, 2, 3, 4, 5]', () => {
  expect(xRemoveOutliersIQR([1, 2, 3, 4, 5])).toStrictEqual([1, 2, 3, 4, 5]);
});

test('[1, 2, 3, 4, 5, 10]', () => {
  expect(xRemoveOutliersIQR([1, 2, 3, 4, 5, 10])).toStrictEqual([
    1, 2, 3, 4, 5,
  ]);
});

test('Float64Array [1, 2, 3, 4, 5]', () => {
  expect(xRemoveOutliersIQR(Float64Array.from([1, 2, 3, 4, 5]))).toStrictEqual(
    Float64Array.from([1, 2, 3, 4, 5]),
  );
});

test('Float64Array [1, 2, 3, 4, 5, 10]', () => {
  expect(
    xRemoveOutliersIQR(Float64Array.from([1, 2, 3, 4, 5, 10])),
  ).toStrictEqual([1, 2, 3, 4, 5]);
});
