import { expect, test } from 'vitest';

import { xSubtract } from '../xSubtract';

test('test xSubtract of 2 vectors', () => {
  const array1 = [10, 11, 12, 13, 14];
  const array2 = [5, 4, 3, 2, 1];

  expect(xSubtract(array1, array2)).toStrictEqual(
    Float64Array.from([5, 7, 9, 11, 13]),
  );
});

test('test xSubtract of 2 a constant', () => {
  const array1 = [10, 11, 12, 13, 14];

  expect(xSubtract(array1, 5)).toStrictEqual(
    Float64Array.from([5, 6, 7, 8, 9]),
  );
});

test('test xSubtract of array and floatarray', () => {
  const array1 = new Float64Array([10, 11, 12, 13, 14]);
  const array2 = [5, 4, 3, 2, 1];

  expect(xSubtract(array1, array2)).toStrictEqual(
    Float64Array.from([5, 7, 9, 11, 13]),
  );
});
