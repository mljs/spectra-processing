import { expect, test } from 'vitest';

import { reimMatrixFFT } from '../reimMatrixFFT.ts';

test('reimMatrixFFT: round-trip on a single row', () => {
  const data = {
    re: [Float64Array.from([0, 3, 6, 5])],
    im: [Float64Array.from([0, 4, 8, 3])],
  };

  const transformed = reimMatrixFFT(data, { applyZeroShift: true });
  const restored = reimMatrixFFT(transformed, {
    inverse: true,
    applyZeroShift: true,
  });

  expect(restored.re[0]).toStrictEqual(data.re[0]);
  expect(restored.im[0]).toStrictEqual(data.im[0]);
});

test('reimMatrixFFT: round-trip on multiple rows', () => {
  const data = {
    re: [
      Float64Array.from([1, 0, 0, 0]),
      Float64Array.from([0, 1, 0, 0]),
      Float64Array.from([0, 3, 6, 5]),
    ],
    im: [
      Float64Array.from([0, 0, 0, 0]),
      Float64Array.from([0, 0, 0, 0]),
      Float64Array.from([0, 4, 8, 3]),
    ],
  };

  const transformed = reimMatrixFFT(data);
  const restored = reimMatrixFFT(transformed, { inverse: true });

  for (let i = 0; i < data.re.length; i++) {
    expect(restored.re[i]).toStrictEqual(data.re[i]);
    expect(restored.im[i]).toStrictEqual(data.im[i]);
  }
});

test('reimMatrixFFT: applyZeroShift round-trip on multiple rows', () => {
  const data = {
    re: [Float64Array.from([0, 3, 6, 5]), Float64Array.from([1, 2, 3, 4])],
    im: [Float64Array.from([0, 4, 8, 3]), Float64Array.from([0, 1, 0, 1])],
  };

  const transformed = reimMatrixFFT(data, { applyZeroShift: true });
  const restored = reimMatrixFFT(transformed, {
    inverse: true,
    applyZeroShift: true,
  });

  for (let i = 0; i < data.re.length; i++) {
    expect(restored.re[i]).toStrictEqual(data.re[i]);
    expect(restored.im[i]).toStrictEqual(data.im[i]);
  }
});

test('reimMatrixFFT: output arrays are independent (no shared buffers)', () => {
  const data = {
    re: [Float64Array.from([1, 0, 0, 0]), Float64Array.from([0, 1, 0, 0])],
    im: [Float64Array.from([0, 0, 0, 0]), Float64Array.from([0, 0, 0, 0])],
  };

  const result = reimMatrixFFT(data);

  expect(result.re[0]).not.toBe(result.re[1]);
  expect(result.im[0]).not.toBe(result.im[1]);
  expect(result.re[0]).not.toBe(data.re[0]);
  expect(result.im[0]).not.toBe(data.im[0]);
});

test('reimMatrixFFT: returns empty matrix for empty input', () => {
  expect(reimMatrixFFT({ re: [], im: [] })).toStrictEqual({ re: [], im: [] });
});

test('reimMatrixFFT: throws RangeError when rows have different lengths', () => {
  const data = {
    re: [
      Float64Array.from([1, 0, 0, 0]),
      Float64Array.from([0, 1, 0, 0, 0, 0, 0, 0]),
    ],
    im: [
      Float64Array.from([0, 0, 0, 0]),
      Float64Array.from([0, 0, 0, 0, 0, 0, 0, 0]),
    ],
  };

  expect(() => reimMatrixFFT(data)).toThrowError(RangeError);
});

test('reimMatrixFFT: throws RangeError indicating which row has the wrong length', () => {
  const data = {
    re: [
      Float64Array.from([1, 0, 0, 0]),
      Float64Array.from([0, 1, 0, 0]),
      Float64Array.from([0, 0, 1, 0, 0, 0, 0, 0]),
    ],
    im: [
      Float64Array.from([0, 0, 0, 0]),
      Float64Array.from([0, 0, 0, 0]),
      Float64Array.from([0, 0, 0, 0, 0, 0, 0, 0]),
    ],
  };

  expect(() => reimMatrixFFT(data)).toThrowError(/row 2/);
});

test('reimMatrixFFT inPlace: result shares re/im references with input', () => {
  const data = {
    re: [Float64Array.from([1, 0, 0, 0]), Float64Array.from([0, 3, 6, 5])],
    im: [Float64Array.from([0, 0, 0, 0]), Float64Array.from([0, 4, 8, 3])],
  };

  const result = reimMatrixFFT(data, { inPlace: true });

  expect(result.re[0]).toBe(data.re[0]);
  expect(result.im[0]).toBe(data.im[0]);
  expect(result.re[1]).toBe(data.re[1]);
  expect(result.im[1]).toBe(data.im[1]);
});

test('reimMatrixFFT inPlace: round-trip restores original values', () => {
  const data = {
    re: [Float64Array.from([0, 3, 6, 5]), Float64Array.from([1, 2, 3, 4])],
    im: [Float64Array.from([0, 4, 8, 3]), Float64Array.from([0, 1, 0, 1])],
  };
  const originals = {
    re: data.re.map((row) => Float64Array.from(row)),
    im: data.im.map((row) => Float64Array.from(row)),
  };

  reimMatrixFFT(data, { inPlace: true, applyZeroShift: true });
  reimMatrixFFT(data, { inPlace: true, inverse: true, applyZeroShift: true });

  for (let i = 0; i < data.re.length; i++) {
    expect(data.re[i]).toStrictEqual(originals.re[i]);
    expect(data.im[i]).toStrictEqual(originals.im[i]);
  }
});
