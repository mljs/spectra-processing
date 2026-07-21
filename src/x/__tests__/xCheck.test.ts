import { expect, test } from 'vitest';

import { xCheck } from '../xCheck.ts';

test('should throw on invalid value', () => {
  expect(() => xCheck(undefined)).toThrow(/input must be an array/);
  expect(() => xCheck([])).toThrow(/input must not be empty/);
  expect(() => xCheck(['yo', 1])).toThrow(/input must contain numbers/);
  expect(() => xCheck([1], { minLength: 2 })).toThrow(
    /input must have a length of at least 2/,
  );
});

test('should not throw on valid value', () => {
  expect(() => xCheck([1])).not.toThrow();
  expect(() => xCheck([1, 2], { minLength: 2 })).not.toThrow();
  expect(() => xCheck([1, 2, 3], { minLength: 2 })).not.toThrow();
});
