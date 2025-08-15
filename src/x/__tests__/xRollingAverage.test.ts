import { expect, test } from 'vitest';

import { xRollingAverage } from '../xRollingAverage.ts';

test('xRollingAverage', () => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  expect(xRollingAverage(array)).toStrictEqual([3, 4, 5, 6, 7]);
  expect(xRollingAverage(array, { window: 3 })).toStrictEqual([
    2, 3, 4, 5, 6, 7, 8,
  ]);

  expect(
    xRollingAverage(array, {
      window: 3,
      padding: {
        algorithm: 'duplicate',
      },
    }),
  ).toMatchCloseTo([1, 1.333333, 2, 3, 4, 5, 6, 7, 8, 8.666666, 9], 5);
});
