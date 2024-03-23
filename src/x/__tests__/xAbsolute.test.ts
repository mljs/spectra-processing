import { expect, test } from 'vitest';

import { xAbsolute } from '../xAbsolute';

test('normal array', () => {
  const array = [-1, 2, -3, 4];
  expect(xAbsolute(array)).toStrictEqual([1, 2, 3, 4]);
});

test('typed array', () => {
  const array = new Float64Array([-1, 2, -3, 4]);
  expect(xAbsolute(array)).toStrictEqual(Float64Array.from([1, 2, 3, 4]));
});
