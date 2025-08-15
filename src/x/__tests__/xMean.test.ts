import { expect, test } from 'vitest';

import { xMean } from '../xMean.ts';

test('xMean', () => {
  const typedArray = new Uint16Array(5);
  typedArray[0] = 1;
  typedArray[1] = 2;
  typedArray[2] = 3;
  typedArray[3] = 4;
  typedArray[4] = 5;

  expect(xMean([0])).toBe(0);
  expect(xMean([1])).toBe(1);
  expect(xMean([1, 2])).toBe(1.5);
  expect(xMean([1, 2, 3])).toBe(2);
  expect(xMean([3, 2, 1])).toBe(2);
  expect(xMean(typedArray)).toBe(3);
  expect(xMean([1, 2, 3], { fromIndex: 1 })).toBe(2.5);
  expect(xMean([3, 2, 1], { fromIndex: 1 })).toBe(1.5);
  expect(xMean([1, 2, 3], { toIndex: 1 })).toBe(1.5);
  expect(xMean([3, 2, 1], { toIndex: 1 })).toBe(2.5);
  expect(xMean([1, 2, 3], { fromIndex: 1, toIndex: 1 })).toBe(2);
  expect(xMean([1, 2, 3], { fromIndex: 1, toIndex: 10 })).toBe(2.5);
  expect(xMean([3, 2, 1], { fromIndex: 1, toIndex: 1 })).toBe(2);
});
