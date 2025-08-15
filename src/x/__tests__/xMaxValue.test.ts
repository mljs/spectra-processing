import { expect, test } from 'vitest';

import { xMaxValue } from '../xMaxValue.ts';

test('xMaxValue', () => {
  const typedArray = new Uint16Array(3);
  typedArray[0] = 1;
  typedArray[1] = 2;
  typedArray[2] = 3;

  expect(xMaxValue([0])).toBe(0);
  expect(xMaxValue([1])).toBe(1);
  expect(xMaxValue([1, 2])).toBe(2);
  expect(xMaxValue([1, 2, 1])).toBe(2);
  expect(xMaxValue([3, 2, 1])).toBe(3);
  expect(xMaxValue(typedArray)).toBe(3);
  expect(xMaxValue([1, 2, 3], { fromIndex: 1 })).toBe(3);
  expect(xMaxValue([3, 2, 1], { fromIndex: 1 })).toBe(2);
  expect(xMaxValue([1, 2, 3], { toIndex: 1 })).toBe(2);
  expect(xMaxValue([3, 2, 1], { toIndex: 1 })).toBe(3);
  expect(xMaxValue([1, 2, 3], { fromIndex: 1, toIndex: 1 })).toBe(2);
  expect(xMaxValue([3, 2, 1], { fromIndex: 1, toIndex: 1 })).toBe(2);
});
