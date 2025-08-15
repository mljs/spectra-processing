import { expect, test } from 'vitest';

import { xDivide } from '../xDivide.ts';

test('test divide of 2 vectors', () => {
  const array1 = [10, 15, 20, 25, 30];
  const array2 = [2, 3, 4, 5, 6];

  expect(xDivide(array1, array2)).toStrictEqual(
    Float64Array.from([5, 5, 5, 5, 5]),
  );
});

test('test divide of Array and FloatArray', () => {
  const array1 = [10, 15, 20, 25, 30];
  const array2 = new Float64Array([2, 3, 4, 5, 6]);

  expect(xDivide(array1, array2)).toStrictEqual(
    Float64Array.from([5, 5, 5, 5, 5]),
  );
});

test('test mul of 2 a constant', () => {
  const array1 = [10, 15, 20, 25, 30];

  expect(xDivide(array1, 5)).toStrictEqual(Float64Array.from([2, 3, 4, 5, 6]));
});
