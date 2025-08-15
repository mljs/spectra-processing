import { expect, test } from 'vitest';

import { nextPowerOfTwo } from '../nextPowerOfTwo.ts';

test('check if a power of two is next', () => {
  expect(nextPowerOfTwo(0)).toBe(1);
  expect(nextPowerOfTwo(1024)).toBe(1024);
  expect(nextPowerOfTwo(1025)).toBe(2048);
  expect(nextPowerOfTwo(1023)).toBe(1024);
});
