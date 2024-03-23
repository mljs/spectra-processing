import { expect, test } from 'vitest';

import { xAdd } from '../xAdd';

test('test xAdd of 2 vectors', () => {
  const array1 = [10, 11, 12, 13, 14];
  const array2 = [5, 4, 3, 2, 1];
  expect(xAdd(array1, array2)).toStrictEqual(
    Float64Array.from([15, 15, 15, 15, 15]),
  );
});

test('test xAdd of 2 a constant', () => {
  const array1 = [10, 11, 12, 13, 14];
  expect(xAdd(array1, 5)).toStrictEqual(
    Float64Array.from([15, 16, 17, 18, 19]),
  );
});

test('test xAdd of array and floatarray', () => {
  const array1 = [10, 11, 12, 13, 14];
  const array2 = new Float64Array([5, 4, 3, 2, 1]);
  expect(xAdd(array1, array2)).toStrictEqual(
    Float64Array.from([15, 15, 15, 15, 15]),
  );
});
