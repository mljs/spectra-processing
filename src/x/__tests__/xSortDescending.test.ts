import { expect, test } from 'vitest';

import { xSortDescending } from '../xSortDescending';

test('xSortDescending on array', () => {
  const array = [3, 1, 2];
  const result = xSortDescending(array);
  expect(result).toStrictEqual([3, 2, 1]);
  expect(result).toBe(array);
});

test('xSortDescending on Float64Array', () => {
  const array = new Float64Array([3, 1, 2]);
  const result = xSortDescending(array);
  expect(result).toStrictEqual(new Float64Array([3, 2, 1]));
  expect(result).toBe(array);
});
