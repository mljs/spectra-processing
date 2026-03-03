import { expect, test } from 'vitest';

import { reimMatrixFFTByColumns } from '../reimMatrixFFTByColumns.ts';

test('reimMatrixFFTByColumns: round-trip on a single column', () => {
  const data = {
    re: [
      Float64Array.from([0, 3]), // row 0
      Float64Array.from([0, 6]), // row 1
      Float64Array.from([0, 5]), // row 2
      Float64Array.from([0, 4]), // row 3
    ],
    im: [
      Float64Array.from([0, 4]),
      Float64Array.from([0, 8]),
      Float64Array.from([0, 3]),
      Float64Array.from([0, 2]),
    ],
  };

  const transformed = reimMatrixFFTByColumns(data, { applyZeroShift: true });
  const restored = reimMatrixFFTByColumns(transformed, {
    inverse: true,
    applyZeroShift: true,
  });

  for (let i = 0; i < data.re.length; i++) {
    expect(restored.re[i]).toStrictEqual(data.re[i]);
    expect(restored.im[i]).toStrictEqual(data.im[i]);
  }
});

test('reimMatrixFFTByColumns: round-trip on multiple columns', () => {
  const data = {
    re: [
      Float64Array.from([1, 0, 2, 3]),
      Float64Array.from([0, 1, 4, 5]),
      Float64Array.from([0, 3, 6, 7]),
      Float64Array.from([1, 2, 3, 4]),
    ],
    im: [
      Float64Array.from([0, 0, 1, 2]),
      Float64Array.from([0, 0, 2, 3]),
      Float64Array.from([0, 4, 8, 1]),
      Float64Array.from([0, 1, 2, 3]),
    ],
  };

  const transformed = reimMatrixFFTByColumns(data);
  const restored = reimMatrixFFTByColumns(transformed, { inverse: true });

  for (let i = 0; i < data.re.length; i++) {
    expect(restored.re[i]).toStrictEqual(data.re[i]);
    expect(restored.im[i]).toStrictEqual(data.im[i]);
  }
});

test('reimMatrixFFTByColumns: applyZeroShift round-trip on multiple columns', () => {
  const data = {
    re: [
      Float64Array.from([0, 3, 6, 5]),
      Float64Array.from([1, 2, 3, 4]),
      Float64Array.from([2, 1, 5, 3]),
      Float64Array.from([0, 4, 2, 1]),
    ],
    im: [
      Float64Array.from([0, 4, 8, 3]),
      Float64Array.from([0, 1, 0, 1]),
      Float64Array.from([1, 2, 3, 0]),
      Float64Array.from([2, 0, 1, 2]),
    ],
  };

  const transformed = reimMatrixFFTByColumns(data, { applyZeroShift: true });
  const restored = reimMatrixFFTByColumns(transformed, {
    inverse: true,
    applyZeroShift: true,
  });

  for (let i = 0; i < data.re.length; i++) {
    expect(restored.re[i]).toStrictEqual(data.re[i]);
    expect(restored.im[i]).toStrictEqual(data.im[i]);
  }
});

test('reimMatrixFFTByColumns: output arrays are independent (no shared buffers)', () => {
  const data = {
    re: [
      Float64Array.from([1, 0]),
      Float64Array.from([0, 1]),
      Float64Array.from([1, 1]),
      Float64Array.from([0, 0]),
    ],
    im: [
      Float64Array.from([0, 0]),
      Float64Array.from([0, 0]),
      Float64Array.from([0, 0]),
      Float64Array.from([0, 0]),
    ],
  };

  const result = reimMatrixFFTByColumns(data);

  expect(result.re[0]).not.toBe(result.re[1]);
  expect(result.im[0]).not.toBe(result.im[1]);
  expect(result.re[0]).not.toBe(data.re[0]);
  expect(result.im[0]).not.toBe(data.im[0]);
});

test('reimMatrixFFTByColumns: returns empty matrix for empty input', () => {
  expect(reimMatrixFFTByColumns({ re: [], im: [] })).toStrictEqual({
    re: [],
    im: [],
  });
});

test('reimMatrixFFTByColumns: throws RangeError when rows have different lengths', () => {
  const data = {
    re: [
      Float64Array.from([1, 0, 0, 0]),
      Float64Array.from([0, 1, 0, 0, 0, 0, 0, 0]),
      Float64Array.from([1, 0, 0, 0]),
      Float64Array.from([0, 1, 0, 0]),
    ],
    im: [
      Float64Array.from([0, 0, 0, 0]),
      Float64Array.from([0, 0, 0, 0, 0, 0, 0, 0]),
      Float64Array.from([0, 0, 0, 0]),
      Float64Array.from([0, 0, 0, 0]),
    ],
  };

  expect(() => reimMatrixFFTByColumns(data)).toThrowError(RangeError);
});

test('reimMatrixFFTByColumns: throws RangeError indicating which row has the wrong length', () => {
  const data = {
    re: [
      Float64Array.from([1, 0, 0, 0]),
      Float64Array.from([0, 1, 0, 0]),
      Float64Array.from([0, 0, 1, 0, 0, 0, 0, 0]),
      Float64Array.from([1, 1, 0, 0]),
    ],
    im: [
      Float64Array.from([0, 0, 0, 0]),
      Float64Array.from([0, 0, 0, 0]),
      Float64Array.from([0, 0, 0, 0, 0, 0, 0, 0]),
      Float64Array.from([0, 0, 0, 0]),
    ],
  };

  expect(() => reimMatrixFFTByColumns(data)).toThrowError(/row 2/);
});

test('reimMatrixFFTByColumns inPlace: result shares re/im references with input', () => {
  const data = {
    re: [
      Float64Array.from([1, 0]),
      Float64Array.from([0, 3]),
      Float64Array.from([2, 1]),
      Float64Array.from([1, 2]),
    ],
    im: [
      Float64Array.from([0, 0]),
      Float64Array.from([0, 4]),
      Float64Array.from([1, 0]),
      Float64Array.from([0, 1]),
    ],
  };

  const result = reimMatrixFFTByColumns(data, { inPlace: true });

  expect(result.re[0]).toBe(data.re[0]);
  expect(result.im[0]).toBe(data.im[0]);
  expect(result.re[1]).toBe(data.re[1]);
  expect(result.im[1]).toBe(data.im[1]);
});

test('reimMatrixFFTByColumns inPlace: round-trip restores original values', () => {
  const data = {
    re: [
      Float64Array.from([0, 3, 6, 5]),
      Float64Array.from([1, 2, 3, 4]),
      Float64Array.from([2, 1, 5, 3]),
      Float64Array.from([0, 4, 2, 1]),
    ],
    im: [
      Float64Array.from([0, 4, 8, 3]),
      Float64Array.from([0, 1, 0, 1]),
      Float64Array.from([1, 2, 3, 0]),
      Float64Array.from([2, 0, 1, 2]),
    ],
  };
  const originals = {
    re: data.re.map((row) => Float64Array.from(row)),
    im: data.im.map((row) => Float64Array.from(row)),
  };

  reimMatrixFFTByColumns(data, { inPlace: true, applyZeroShift: true });
  reimMatrixFFTByColumns(data, {
    inPlace: true,
    inverse: true,
    applyZeroShift: true,
  });

  for (let i = 0; i < data.re.length; i++) {
    expect(data.re[i]).toStrictEqual(originals.re[i]);
    expect(data.im[i]).toStrictEqual(originals.im[i]);
  }
});

test('reimMatrixFFTByColumns: processes each column independently', () => {
  // Create a matrix where each column has distinct, recognizable patterns
  const data = {
    re: [
      Float64Array.from([1, 2, 3, 4]), // column 0: [1, 0, 0, 0], column 1: [2, 0, 0, 0], etc.
      Float64Array.from([0, 0, 0, 0]),
      Float64Array.from([0, 0, 0, 0]),
      Float64Array.from([0, 0, 0, 0]),
    ],
    im: [
      Float64Array.from([0, 0, 0, 0]),
      Float64Array.from([0, 0, 0, 0]),
      Float64Array.from([0, 0, 0, 0]),
      Float64Array.from([0, 0, 0, 0]),
    ],
  };

  const transformed = reimMatrixFFTByColumns(data);

  // Column 0 contains [1, 0, 0, 0]
  const col0Re = transformed.re.map((row) => row[0]);
  const col0Im = transformed.im.map((row) => row[0]);

  // Column 1 contains [2, 0, 0, 0]
  const col1Re = transformed.re.map((row) => row[1]);
  const col1Im = transformed.im.map((row) => row[1]);

  // Column 2 contains [3, 0, 0, 0]
  const col2Re = transformed.re.map((row) => row[2]);
  const col2Im = transformed.im.map((row) => row[2]);

  // The FFT of [1, 0, 0, 0] scaled by amplitude
  // FFT of [2, 0, 0, 0] should be the FFT of [1, 0, 0, 0] scaled by 2
  // FFT of [3, 0, 0, 0] should be the FFT of [1, 0, 0, 0] scaled by 3

  // Verify scaling relationship: col1 = col0 * 2, col2 = col0 * 3
  for (let i = 0; i < 4; i++) {
    expect(col1Re[i]).toBeCloseTo(col0Re[i] * 2, 10);
    expect(col1Im[i]).toBeCloseTo(col0Im[i] * 2, 10);
    expect(col2Re[i]).toBeCloseTo(col0Re[i] * 3, 10);
    expect(col2Im[i]).toBeCloseTo(col0Im[i] * 3, 10);
  }
});

test('reimMatrixFFTByColumns: handles matrix with single column', () => {
  const data = {
    re: [
      Float64Array.from([1]),
      Float64Array.from([2]),
      Float64Array.from([3]),
      Float64Array.from([4]),
    ],
    im: [
      Float64Array.from([0]),
      Float64Array.from([0]),
      Float64Array.from([0]),
      Float64Array.from([0]),
    ],
  };

  const transformed = reimMatrixFFTByColumns(data);
  const restored = reimMatrixFFTByColumns(transformed, { inverse: true });

  for (let i = 0; i < data.re.length; i++) {
    expect(restored.re[i]).toStrictEqual(data.re[i]);
    expect(restored.im[i]).toStrictEqual(data.im[i]);
  }
});

test('reimMatrixFFTByColumns: handles multiple row matrix with few columns', () => {
  const data = {
    re: [
      Float64Array.from([1, 2]),
      Float64Array.from([3, 4]),
      Float64Array.from([5, 6]),
      Float64Array.from([7, 8]),
    ],
    im: [
      Float64Array.from([0, 1]),
      Float64Array.from([2, 3]),
      Float64Array.from([1, 0]),
      Float64Array.from([0, 2]),
    ],
  };

  const transformed = reimMatrixFFTByColumns(data);
  const restored = reimMatrixFFTByColumns(transformed, { inverse: true });

  expect(restored.re[0]).toStrictEqual(data.re[0]);
  expect(restored.im[0]).toStrictEqual(data.im[0]);
});

test('reimMatrixFFTByColumns: throws error for matrices with mismatched column counts', () => {
  const data = {
    re: [
      Float64Array.from([1, 2]),
      Float64Array.from([3]), // different column count
      Float64Array.from([5, 6]),
      Float64Array.from([7, 8]),
    ],
    im: [
      Float64Array.from([0, 0]),
      Float64Array.from([0]),
      Float64Array.from([0, 0]),
      Float64Array.from([0, 0]),
    ],
  };

  expect(() => reimMatrixFFTByColumns(data)).toThrowError(RangeError);
});
