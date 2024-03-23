import { expect, test } from 'vitest';

import { xCheck } from '../xCheck';

test('should throw on invalid value', () => {
  expect(() => xCheck()).toThrow(/input must be an array/);
  expect(() => xCheck([])).toThrow(/input must not be empty/);
  expect(() => xCheck([1])).not.toThrow();
  expect(() => xCheck([1], { minLength: 2 })).toThrow(
    /input must have a length of at least 2/,
  );
});
