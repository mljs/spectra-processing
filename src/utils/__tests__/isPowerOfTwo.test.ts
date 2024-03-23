import { expect, test } from 'vitest';

import { isPowerOfTwo } from '../isPowerOfTwo';

test('check if a power of two is next', () => {
  expect(isPowerOfTwo(1024)).toEqual(true);
  expect(isPowerOfTwo(1025)).toEqual(false);
  expect(isPowerOfTwo(1023)).toEqual(false);
});
