import { expect, test } from 'vitest';

import { reimFFT } from '../reimFFT.ts';

test('reimFFT', () => {
  const re = Float64Array.from([0, 3, 6, 5]);
  const im = Float64Array.from([0, 4, 8, 3]);
  const transformed = reimFFT({ re, im }, { applyZeroShift: true });
  const inverse = reimFFT(transformed, {
    inverse: true,
    applyZeroShift: true,
  });

  expect(inverse.re).toStrictEqual(re);
  expect(inverse.im).toStrictEqual(im);
  // check pointer are different
  expect(inverse.re).not.toBe(re);
  expect(inverse.im).not.toBe(im);

  const transformed2 = reimFFT({ re, im }, { inPlace: true });
  const inverse2 = reimFFT(transformed2, { inverse: true, inPlace: true });

  expect(inverse2.re).toStrictEqual(re);
  expect(inverse2.im).toStrictEqual(im);
  // check pointer are the same
  expect(inverse2.re).toBe(re);
  expect(inverse2.im).toBe(im);
});
