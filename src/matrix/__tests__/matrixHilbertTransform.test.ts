import { expect, test } from 'vitest';

import { xHilbertTransform } from '../../x/xHilbertTransform.ts';
import { matrixHilbertTransform } from '../matrixHilbertTransform.ts';

const row0 = Float64Array.from([1, 0, -1, 0, 1, 0, -1, 0]);
const row1 = Float64Array.from([0, 1, 0, -1, 0, 1, 0, -1]);
const row2 = Float64Array.from([1, 2, 3, 4, 3, 2, 1, 0]);

test('matrixHilbertTransform: matches xHilbertTransform row by row', () => {
  const rows = [row0, row1, row2];
  const result = matrixHilbertTransform(rows);

  for (let i = 0; i < rows.length; i++) {
    expect(result[i]).toStrictEqual(xHilbertTransform(rows[i]));
  }
});

test('matrixHilbertTransform: returns empty array for empty input', () => {
  expect(matrixHilbertTransform([])).toStrictEqual([]);
});

test('matrixHilbertTransform: output arrays are independent (no shared buffers)', () => {
  const rows = [row0, row1];
  const result = matrixHilbertTransform(rows);

  expect(result[0]).not.toBe(result[1]);
  expect(result[0]).not.toBe(rows[0]);
  expect(result[1]).not.toBe(rows[1]);
});

test('matrixHilbertTransform: throws RangeError when length is not a power of two', () => {
  const rows = [Float64Array.from([1, 2, 3, 4, 5, 6])];

  expect(() => matrixHilbertTransform(rows)).toThrowError(RangeError);
  expect(() => matrixHilbertTransform(rows)).toThrowError(/power of two/);
});

test('matrixHilbertTransform: throws RangeError when rows have different lengths', () => {
  const rows = [row0, Float64Array.from([1, 2, 3, 4])];

  expect(() => matrixHilbertTransform(rows)).toThrowError(RangeError);
  expect(() => matrixHilbertTransform(rows)).toThrowError(/row 1/);
});

test('matrixHilbertTransform inPlace: result shares references with input', () => {
  const rows = [Float64Array.from(row0), Float64Array.from(row1)];
  const result = matrixHilbertTransform(rows, { output: rows });

  expect(result[0]).toBe(rows[0]);
  expect(result[1]).toBe(rows[1]);
});

test('matrixHilbertTransform inPlace: produces same values as out-of-place', () => {
  const rowsCopy = [Float64Array.from(row0), Float64Array.from(row1)];
  const outOfPlace = matrixHilbertTransform([row0, row1]);
  matrixHilbertTransform(rowsCopy, { output: rowsCopy });

  expect(rowsCopy[0]).toStrictEqual(outOfPlace[0]);
  expect(rowsCopy[1]).toStrictEqual(outOfPlace[1]);
});
