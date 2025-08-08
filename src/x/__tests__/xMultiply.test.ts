import { expect, test } from 'vitest';

import { xMultiply } from '../xMultiply';

test('test mul of 2 vectors', () => {
  const array1 = [10, 11, 12, 13, 14];
  const array2 = [5, 4, 3, 2, 1];

  expect(xMultiply(array1, array2)).toStrictEqual(
    Float64Array.from([50, 44, 36, 26, 14]),
  );
});

test('test mul of array and floatarray', () => {
  const array1 = [10, 11, 12, 13, 14];
  const array2 = new Float64Array([5, 4, 3, 2, 1]);

  expect(xMultiply(array1, array2)).toStrictEqual(
    Float64Array.from([50, 44, 36, 26, 14]),
  );
});

test('test mul of 2 a constant', () => {
  const array1 = [10, 11, 12, 13, 14];

  expect(xMultiply(array1, 5)).toStrictEqual(
    Float64Array.from([50, 55, 60, 65, 70]),
  );
});

test('check 2 different array', () => {
  const array = [10, 11, 12, 13, 14];
  const result = xMultiply(array, 5);

  expect(array).not.toBe(result);
});

test('check same array', () => {
  const array = [10, 11, 12, 13, 14];
  const result = xMultiply(array, 5, { output: array });

  expect(array).toBe(result);
  expect(result).toStrictEqual([50, 55, 60, 65, 70]);
});
