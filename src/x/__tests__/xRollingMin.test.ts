import { toMatchCloseTo } from 'jest-matcher-deep-close-to';

import { xRollingMin } from '../../index';

expect.extend({ toMatchCloseTo });

test('xRollingMin', () => {
  let array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  expect(xRollingMin(array)).toStrictEqual([1, 2, 3, 4, 5]);

  expect(xRollingMin(array, { window: 3 })).toStrictEqual([
    1, 2, 3, 4, 5, 6, 7,
  ]);

  expect(
    xRollingMin(array, {
      window: 3,
      padding: {
        algorithm: 'duplicate',
      },
    }),
  ).toMatchCloseTo([1, 1, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
});
