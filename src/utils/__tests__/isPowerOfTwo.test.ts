import { expect, test } from 'vitest';

import { isPowerOfTwo } from '../isPowerOfTwo.ts';

test('check if a power of two is next', () => {
  expect(isPowerOfTwo(1024)).toBe(true);
  expect(isPowerOfTwo(1025)).toBe(false);
  expect(isPowerOfTwo(1023)).toBe(false);
});
