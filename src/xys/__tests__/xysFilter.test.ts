import { expect, test } from 'vitest';

import { xyArrayAlign } from '../../xyArray/xyArrayAlign.ts';
import { xysFilter } from '../xysFilter.ts';

/*
 * Eight spectra, four slots.
 *          x=10  x=20  x=30  x=40
 * present    4     3     3     2   spectra
 * longest    1     3     3     2   run of consecutive spectra
 */
function aligned() {
  return {
    x: [10, 20, 30, 40],
    ys: [
      [1, 0, 0, 1],
      [0, 0, 1, 1],
      [1, 0, 1, 0],
      [0, 0, 1, 0],
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [1, 1, 0, 0],
      [0, 1, 0, 0],
    ],
  };
}

test('without options nothing is removed', () => {
  const data = aligned();
  const result = xysFilter(data);

  expect(Array.from(result.x)).toStrictEqual(data.x);
  expect(result.ys.map((y) => Array.from(y))).toStrictEqual(data.ys);
});

test('minY on its own removes nothing', () => {
  const data = aligned();
  const result = xysFilter(data, { minY: 5 });

  expect(Array.from(result.x)).toStrictEqual(data.x);
  expect(result.ys.map((y) => Array.from(y))).toStrictEqual(data.ys);
});

test('minNumberOfSpectra counts the spectra wherever they are', () => {
  const result = xysFilter(aligned(), { minNumberOfSpectra: 3 });

  expect(Array.from(result.x)).toStrictEqual([10, 20, 30]);
  expect(result.ys.map((y) => Array.from(y))).toStrictEqual([
    [1, 0, 0],
    [0, 0, 1],
    [1, 0, 1],
    [0, 0, 1],
    [1, 0, 0],
    [0, 1, 0],
    [1, 1, 0],
    [0, 1, 0],
  ]);
});

test('minConsecutiveSpectra rejects the scattered slot the count kept', () => {
  // x=10 is in four spectra but never in two neighbouring ones.
  const result = xysFilter(aligned(), { minConsecutiveSpectra: 3 });

  expect(Array.from(result.x)).toStrictEqual([20, 30]);
  expect(result.ys.map((y) => Array.from(y))).toStrictEqual([
    [0, 0],
    [0, 1],
    [0, 1],
    [0, 1],
    [0, 0],
    [1, 0],
    [1, 0],
    [1, 0],
  ]);
});

test('two consecutive spectra are enough for the narrow slot', () => {
  const result = xysFilter(aligned(), { minConsecutiveSpectra: 2 });

  expect(Array.from(result.x)).toStrictEqual([20, 30, 40]);
});

test('the criteria are combined', () => {
  const result = xysFilter(aligned(), {
    minNumberOfSpectra: 3,
    minConsecutiveSpectra: 2,
  });

  expect(Array.from(result.x)).toStrictEqual([20, 30]);
});

test('requiredY keeps only the slots every spectrum contains', () => {
  const result = xysFilter(
    {
      x: [1, 2],
      ys: [
        [1, 1],
        [0, 1],
        [3, 1],
      ],
    },
    { requiredY: true },
  );

  expect(Array.from(result.x)).toStrictEqual([2]);
  expect(result.ys.map((y) => Array.from(y))).toStrictEqual([[1], [1], [1]]);
});

test('a negative peak counts as present until minY is set', () => {
  const data = {
    x: [1, 2],
    ys: [
      [-5, 0],
      [3, 4],
    ],
  };

  expect(Array.from(xysFilter(data, { requiredY: true }).x)).toStrictEqual([1]);
  // Setting minY compares the y itself, so the negative peak stops counting.
  expect(
    Array.from(xysFilter(data, { requiredY: true, minY: 0 }).x),
  ).toStrictEqual([]);
});

test('minY sets how intense a peak must be to count', () => {
  const data = {
    x: [1, 2],
    ys: [
      [5, 1],
      [5, 1],
      [5, 1],
    ],
  };

  expect(
    Array.from(xysFilter(data, { minNumberOfSpectra: 3 }).x),
  ).toStrictEqual([1, 2]);
  expect(
    Array.from(xysFilter(data, { minNumberOfSpectra: 3, minY: 2 }).x),
  ).toStrictEqual([1]);
});

test('agrees with the requiredY option of xyArrayAlign', () => {
  const data = [
    { x: [1, 2, 3], y: [1, 1, 1] },
    { x: [0.1, 1.1, 2.1, 3.1, 4.1], y: [1, 1, 1, 1, 1] },
    { x: [2.9, 3.1, 3.9, 4.9], y: [1, 1, 1, 1] },
  ];
  const expected = xyArrayAlign(data, { delta: 0.15, requiredY: true });
  const result = xysFilter(xyArrayAlign(data, { delta: 0.15 }), {
    requiredY: true,
  });

  expect(Array.from(result.x)).toStrictEqual(Array.from(expected.x));
  expect(result.ys.map((y) => Array.from(y))).toStrictEqual(
    expected.ys.map((y) => Array.from(y)),
  );
});

test('no slot survives', () => {
  const result = xysFilter(aligned(), { minNumberOfSpectra: 8 });

  expect(Array.from(result.x)).toStrictEqual([]);
  expect(result.ys).toHaveLength(8);
  expect(Array.from(result.ys[0])).toStrictEqual([]);
});

test('no spectra', () => {
  const result = xysFilter({ x: [1, 2], ys: [] }, { requiredY: true });

  expect(Array.from(result.x)).toStrictEqual([1, 2]);
  expect(result.ys).toStrictEqual([]);
});
