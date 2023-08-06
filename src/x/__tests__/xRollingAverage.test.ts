import { toMatchCloseTo } from 'jest-matcher-deep-close-to';

import { xRollingAverage } from '../../index';

expect.extend({ toMatchCloseTo });

test('xRollingAverage', () => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  expect(xRollingAverage(array)).toStrictEqual([3, 4, 5, 6, 7]);
  // prettier-ignore
  expect(xRollingAverage(array, { window: 3 })).toStrictEqual([
    2, 3, 4, 5, 6, 7, 8,
  ]);

  // prettier-ignore
  expect(xRollingAverage(array, {
    window: 3, padding: {
      algorithm: 'duplicate'
    }
  })).toMatchCloseTo([
    1, 1.333333, 2, 3, 4, 5, 6, 7, 8, 8.666666, 9
  ], 5);
});
