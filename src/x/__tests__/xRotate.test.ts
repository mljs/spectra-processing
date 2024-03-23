import { expect, test } from 'vitest';

import { xRotate } from '../xRotate';

test('test xRotate positive', () => {
  const array = [10, 11, 12, 13, 14];
  expect(xRotate(array, 0)).toStrictEqual(
    Float64Array.from([10, 11, 12, 13, 14]),
  );
  expect(xRotate(array, 2)).toStrictEqual(
    Float64Array.from([13, 14, 10, 11, 12]),
  );
  expect(xRotate(array, 4)).toStrictEqual(
    Float64Array.from([11, 12, 13, 14, 10]),
  );
  expect(xRotate(array, 6)).toStrictEqual(
    Float64Array.from([14, 10, 11, 12, 13]),
  );
});

test('test xRotate negative', () => {
  const array = [10, 11, 12, 13, 14];
  expect(xRotate(array, -2)).toStrictEqual(
    Float64Array.from([12, 13, 14, 10, 11]),
  );
  expect(xRotate(array, -4)).toStrictEqual(
    Float64Array.from([14, 10, 11, 12, 13]),
  );
  expect(xRotate(array, -6)).toStrictEqual(
    Float64Array.from([11, 12, 13, 14, 10]),
  );
});
