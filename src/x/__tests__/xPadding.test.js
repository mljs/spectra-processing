import { xPadding } from '../xPadding.js';

test('xPadding', function () {
  let array = [1, 2, 3, 4, 5];

  expect(Array.from(xPadding(array))).toStrictEqual([1, 2, 3, 4, 5]);

  expect(Array.from(xPadding(array, { size: 2 }))).toStrictEqual([
    0,
    0,
    1,
    2,
    3,
    4,
    5,
    0,
    0,
  ]);

  expect(Array.from(xPadding(array, { size: 2, value: 6 }))).toStrictEqual([
    6,
    6,
    1,
    2,
    3,
    4,
    5,
    6,
    6,
  ]);

  expect(
    Array.from(xPadding(array, { size: 2, algorithm: 'duplicate' })),
  ).toStrictEqual([1, 1, 1, 2, 3, 4, 5, 5, 5]);

  expect(
    Array.from(xPadding(array, { size: 2, algorithm: 'circular' })),
  ).toStrictEqual([4, 5, 1, 2, 3, 4, 5, 1, 2]);

  expect(
    Array.from(xPadding(array, { size: 6, algorithm: 'circular' })),
  ).toStrictEqual([5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1]);
});
