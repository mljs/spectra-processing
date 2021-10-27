import { toMatchCloseTo } from 'jest-matcher-deep-close-to';

import { xRollingMedian } from '../xRollingMedian';

expect.extend({ toMatchCloseTo });

test('xRollingMedian', () => {
  let array = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  expect(xRollingMedian(array)).toStrictEqual([3, 4, 5, 6, 7]);
  // prettier-ignore
  expect(xRollingMedian(array, { window: 3 })).toStrictEqual([
    2, 3, 4, 5, 6, 7, 8,
  ]);

  // prettier-ignore
  expect(xRollingMedian(array, {
    window: 3, padding: {
      algorithm: 'duplicate'
    }
  })).toMatchCloseTo([
    1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 9
  ], 5);
});
