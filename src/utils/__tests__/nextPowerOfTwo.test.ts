import { expect, test } from 'vitest';

import { nextPowerOfTwo } from '../nextPowerOfTwo';

test('check if a power of two is next', () => {
  expect(nextPowerOfTwo(0)).toEqual(1);
  expect(nextPowerOfTwo(1024)).toEqual(1024);
  expect(nextPowerOfTwo(1025)).toEqual(2048);
  expect(nextPowerOfTwo(1023)).toEqual(1024);
});
