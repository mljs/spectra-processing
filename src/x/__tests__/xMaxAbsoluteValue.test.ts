import { expect, test } from 'vitest';

import { xMaxAbsoluteValue } from '../xMaxAbsoluteValue';

test('xMaxAbsoluteValue', () => {
  const typedArray = new Int16Array(3);
  typedArray[0] = 1;
  typedArray[1] = 2;
  typedArray[2] = -3;

  expect(xMaxAbsoluteValue([0])).toBe(0);
  expect(xMaxAbsoluteValue([1])).toBe(1);
  expect(xMaxAbsoluteValue([1, 2])).toBe(2);
  expect(xMaxAbsoluteValue([1, 2, 1])).toBe(2);
  expect(xMaxAbsoluteValue([3, 2, 1])).toBe(3);
  expect(xMaxAbsoluteValue(typedArray)).toBe(3);
  expect(xMaxAbsoluteValue([1, 2, 3], { fromIndex: 1 })).toBe(3);
  expect(xMaxAbsoluteValue([3, 2, 1], { fromIndex: 1 })).toBe(2);
  expect(xMaxAbsoluteValue([1, 2, 3], { toIndex: 1 })).toBe(2);
  expect(xMaxAbsoluteValue([3, 2, 1], { toIndex: 1 })).toBe(3);
  expect(xMaxAbsoluteValue([1, 2, 3], { fromIndex: 1, toIndex: 1 })).toBe(2);
  expect(xMaxAbsoluteValue([3, 2, 1], { fromIndex: 1, toIndex: 1 })).toBe(2);
});
