import { expect, test } from 'vitest';

import { reimAbsolute } from '../reimAbsolute';

test('test reimAbsolute', () => {
  const re = [0, 3, 6];
  const im = [0, 4, 8];
  const result = reimAbsolute({ re, im });

  expect(result).toStrictEqual(Float64Array.from([0, 5, 10]));
});
