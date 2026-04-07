import { expect, test } from 'vitest';

import { xRolling } from '../xRolling.ts';

test('xRolling', () => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  expect(() => xRolling(array)).toThrowError('fct must be a function');
  expect(xRolling(array, () => 1, { window: 5 })).toStrictEqual([
    1, 1, 1, 1, 1,
  ]);
});
