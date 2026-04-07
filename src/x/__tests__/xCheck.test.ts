import { expect, test } from 'vitest';

import { xCheck } from '../xCheck.ts';

test('should throw on invalid value', () => {
  expect(() => xCheck()).toThrowError(/input must be an array/);
  expect(() => xCheck([])).toThrowError(/input must not be empty/);
  expect(() => xCheck([1])).not.toThrowError();
  expect(() => xCheck([1], { minLength: 2 })).toThrowError(
    /input must have a length of at least 2/,
  );
});
