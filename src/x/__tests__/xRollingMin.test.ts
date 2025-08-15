import { expect, test } from 'vitest';

import { xRollingMin } from '../xRollingMin.ts';

test('xRollingMin', () => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];

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
