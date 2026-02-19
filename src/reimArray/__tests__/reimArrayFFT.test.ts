import { expect, test } from 'vitest';

import { reimArrayFFT } from '../reimArrayFFT.ts';

test('reimArrayFFT: round-trip on a single spectrum', () => {
  const re = Float64Array.from([0, 3, 6, 5]);
  const im = Float64Array.from([0, 4, 8, 3]);

  const [transformed] = reimArrayFFT([{ re, im }], { applyZeroShift: true });
  const [inverse] = reimArrayFFT([transformed], {
    inverse: true,
    applyZeroShift: true,
  });

  expect(inverse.re).toStrictEqual(re);
  expect(inverse.im).toStrictEqual(im);
});

test('reimArrayFFT: round-trip on multiple spectra, single FFT instance', () => {
  const spectra = [
    {
      re: Float64Array.from([1, 0, 0, 0]),
      im: Float64Array.from([0, 0, 0, 0]),
    },
    {
      re: Float64Array.from([0, 1, 0, 0]),
      im: Float64Array.from([0, 0, 0, 0]),
    },
    {
      re: Float64Array.from([0, 3, 6, 5]),
      im: Float64Array.from([0, 4, 8, 3]),
    },
  ];

  const transformed = reimArrayFFT(spectra);
  const restored = reimArrayFFT(transformed, { inverse: true });

  for (let i = 0; i < spectra.length; i++) {
    expect(restored[i].re).toStrictEqual(spectra[i].re);
    expect(restored[i].im).toStrictEqual(spectra[i].im);
  }
});

test('reimArrayFFT: applyZeroShift round-trip on multiple spectra', () => {
  const spectra = [
    {
      re: Float64Array.from([0, 3, 6, 5]),
      im: Float64Array.from([0, 4, 8, 3]),
    },
    {
      re: Float64Array.from([1, 2, 3, 4]),
      im: Float64Array.from([0, 1, 0, 1]),
    },
  ];

  const transformed = reimArrayFFT(spectra, { applyZeroShift: true });
  const restored = reimArrayFFT(transformed, {
    inverse: true,
    applyZeroShift: true,
  });

  for (let i = 0; i < spectra.length; i++) {
    expect(restored[i].re).toStrictEqual(spectra[i].re);
    expect(restored[i].im).toStrictEqual(spectra[i].im);
  }
});

test('reimArrayFFT: output arrays are independent (no shared buffers between results)', () => {
  const spectra = [
    {
      re: Float64Array.from([1, 0, 0, 0]),
      im: Float64Array.from([0, 0, 0, 0]),
    },
    {
      re: Float64Array.from([0, 1, 0, 0]),
      im: Float64Array.from([0, 0, 0, 0]),
    },
  ];

  const results = reimArrayFFT(spectra);

  expect(results[0].re).not.toBe(results[1].re);
  expect(results[0].im).not.toBe(results[1].im);
  expect(results[0].re).not.toBe(spectra[0].re);
  expect(results[0].im).not.toBe(spectra[0].im);
});

test('reimArrayFFT: returns empty array for empty input', () => {
  expect(reimArrayFFT([])).toStrictEqual([]);
});

test('reimArrayFFT: throws RangeError when elements have different lengths', () => {
  const spectra = [
    {
      re: Float64Array.from([1, 0, 0, 0]),
      im: Float64Array.from([0, 0, 0, 0]),
    },
    {
      re: Float64Array.from([0, 1, 0, 0, 0, 0, 0, 0]),
      im: Float64Array.from([0, 0, 0, 0, 0, 0, 0, 0]),
    },
  ];

  expect(() => reimArrayFFT(spectra)).toThrowError(RangeError);
});

test('reimArrayFFT: throws RangeError indicating which element has the wrong length', () => {
  const spectra = [
    {
      re: Float64Array.from([1, 0, 0, 0]),
      im: Float64Array.from([0, 0, 0, 0]),
    },
    {
      re: Float64Array.from([0, 1, 0, 0]),
      im: Float64Array.from([0, 0, 0, 0]),
    },
    {
      re: Float64Array.from([0, 0, 1, 0, 0, 0, 0, 0]),
      im: Float64Array.from([0, 0, 0, 0, 0, 0, 0, 0]),
    },
  ];

  expect(() => reimArrayFFT(spectra)).toThrowError(/element 2/);
});
