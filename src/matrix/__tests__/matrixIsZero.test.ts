import { expect, test } from 'vitest';

import { matrixIsZero } from '../matrixIsZero.ts';

test('should return true for a matrix of zeros', () => {
  const matrix = [
    new Float64Array([0, 0, 0]),
    new Float64Array([0, 0, 0]),
    new Float64Array([0, 0, 0]),
  ];

  expect(matrixIsZero(matrix)).toBe(true);
});

test('should return false when one value is not zero', () => {
  const matrix = [
    new Float64Array([0, 0, 0]),
    new Float64Array([0, 1, 0]),
    new Float64Array([0, 0, 0]),
  ];

  expect(matrixIsZero(matrix)).toBe(false);
});

test('should return false for a non-zero value in the last row and column', () => {
  const matrix = [
    new Float64Array([0, 0, 0]),
    new Float64Array([0, 0, 0]),
    new Float64Array([0, 0, -1e-12]),
  ];

  expect(matrixIsZero(matrix)).toBe(false);
});

test('should work with plain arrays', () => {
  expect(
    matrixIsZero([
      [0, 0],
      [0, 0],
    ]),
  ).toBe(true);
  expect(
    matrixIsZero([
      [0, 0],
      [0, 2],
    ]),
  ).toBe(false);
});

test('should consider negative zero as zero', () => {
  const matrix = [new Float64Array([-0, 0]), new Float64Array([0, -0])];

  expect(matrixIsZero(matrix)).toBe(true);
});

test('should consider NaN and infinity as not zero', () => {
  expect(matrixIsZero([new Float64Array([0, Number.NaN])])).toBe(false);
  expect(matrixIsZero([new Float64Array([0, Number.POSITIVE_INFINITY])])).toBe(
    false,
  );
  expect(matrixIsZero([new Float64Array([0, Number.NEGATIVE_INFINITY])])).toBe(
    false,
  );
});

test('should return true for a matrix without values', () => {
  expect(matrixIsZero([])).toBe(true);
  expect(matrixIsZero([[], []])).toBe(true);
});
