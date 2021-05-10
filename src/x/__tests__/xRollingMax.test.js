import { toMatchCloseTo } from 'jest-matcher-deep-close-to';

import { xRollingMax } from '../xRollingMax.js';

expect.extend({ toMatchCloseTo });

test('xRollingMax', function () {
  let array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  expect(xRollingMax(array)).toStrictEqual([5, 6, 7, 8, 9]);

  expect(xRollingMax(array, { window: 3 })).toStrictEqual([
    3, 4, 5, 6, 7, 8, 9,
  ]);

  expect(
    xRollingMax(array, {
      window: 3,
      padding: {
        algorithm: 'duplicate',
      },
    }),
  ).toMatchCloseTo([1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 9]);
});
