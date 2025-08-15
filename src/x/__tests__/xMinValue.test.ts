import { expect, test } from 'vitest';

import { xMinValue } from '../xMinValue.ts';

test('xMinValue', () => {
  const typedArray = new Uint16Array(3);
  typedArray[0] = 1;
  typedArray[1] = 2;
  typedArray[2] = 3;

  expect(xMinValue([0])).toBe(0);
  expect(xMinValue([1])).toBe(1);
  expect(xMinValue([1, 2])).toBe(1);
  expect(xMinValue([1, 2, 1])).toBe(1);
  expect(xMinValue([3, 2, 1])).toBe(1);
  expect(xMinValue(typedArray)).toBe(1);
  expect(xMinValue([1, 2, 3], { fromIndex: 1 })).toBe(2);
  expect(xMinValue([3, 2, 1], { fromIndex: 1 })).toBe(1);
  expect(xMinValue([1, 2, 3], { toIndex: 1 })).toBe(1);
  expect(xMinValue([3, 2, 1], { toIndex: 1 })).toBe(2);
  expect(xMinValue([1, 2, 3], { fromIndex: 1, toIndex: 1 })).toBe(2);
  expect(xMinValue([3, 2, 1], { fromIndex: 1, toIndex: 1 })).toBe(2);
});
