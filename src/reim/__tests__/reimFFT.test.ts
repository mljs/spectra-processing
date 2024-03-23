import { expect, test } from 'vitest';

import { reimFFT } from '../reimFFT';

test('test reimFFT', () => {
  const re = Float64Array.from([0, 3, 6, 5]);
  const im = Float64Array.from([0, 4, 8, 3]);
  const transformed = reimFFT({ re, im }, { applyZeroShift: true });
  const inverse = reimFFT(transformed, {
    inverse: true,
    applyZeroShift: true,
  });
  expect(inverse.re).toStrictEqual(re);
});
