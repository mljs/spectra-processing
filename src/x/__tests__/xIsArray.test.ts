import { expect, test } from 'vitest';

import { xIsArray } from '../xIsArray.ts';

test('should return false on invalid value', () => {
  expect(xIsArray(undefined)).toBe(false);
  expect(xIsArray([])).toBe(false);
  expect(xIsArray(['yo', 1])).toBe(false);
  expect(xIsArray([1], { minLength: 2 })).toBe(false);
});

test('should return true on valid value', () => {
  expect(xIsArray([1])).toBe(true);
  expect(xIsArray([1, 2], { minLength: 2 })).toBe(true);
  expect(xIsArray([1, 2, 3], { minLength: 2 })).toBe(true);
});
