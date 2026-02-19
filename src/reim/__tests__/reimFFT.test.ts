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
});

test('reimFFT inPlace: returns same object and mutates input arrays', () => {
  const re = Float64Array.from([0, 3, 6, 5]);
  const im = Float64Array.from([0, 4, 8, 3]);
  const data = { re, im };

  const result = reimFFT(data, { inPlace: true });

  expect(result).toBe(data);
  expect(result.re).toBe(re);
  expect(result.im).toBe(im);
});

test('reimFFT inPlace: round-trip restores original values', () => {
  const re = Float64Array.from([0, 3, 6, 5]);
  const im = Float64Array.from([0, 4, 8, 3]);
  const reOrig = Float64Array.from(re);
  const imOrig = Float64Array.from(im);
  const data = { re, im };

  reimFFT(data, { inPlace: true, applyZeroShift: true });
  reimFFT(data, { inPlace: true, inverse: true, applyZeroShift: true });

  expect(data.re).toStrictEqual(reOrig);
  expect(data.im).toStrictEqual(imOrig);
});
