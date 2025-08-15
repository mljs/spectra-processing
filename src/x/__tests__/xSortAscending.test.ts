import { expect, test } from 'vitest';

import { xSortAscending } from '../xSortAscending.ts';

test('xSortAscending on array', () => {
  const array = [3, 1, 2];
  const result = xSortAscending(array);

  expect(result).toStrictEqual([1, 2, 3]);
  expect(result).toBe(array);
});

test('xSortAscending on Float64Array', () => {
  const array = new Float64Array([3, 1, 2]);
  const result = xSortAscending(array);

  expect(result).toStrictEqual(new Float64Array([1, 2, 3]));
  expect(result).toBe(array);
});
