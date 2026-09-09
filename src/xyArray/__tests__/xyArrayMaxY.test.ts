import { expect, test } from 'vitest';

import { xyArrayMaxY } from '../xyArrayMaxY.ts';

test('the largest y of all the spectra', () => {
  expect(
    xyArrayMaxY([
      { x: [1, 2], y: [10, 50] },
      { x: [3], y: [30] },
    ]),
  ).toBe(50);
});

test('empty spectra are skipped', () => {
  expect(
    xyArrayMaxY([
      { x: [], y: [] },
      { x: [1], y: [7] },
      { x: [], y: [] },
    ]),
  ).toBe(7);
});

test('every y may be negative', () => {
  expect(
    xyArrayMaxY([
      { x: [1], y: [-5] },
      { x: [2], y: [-2] },
    ]),
  ).toBe(-2);
});

test('typed arrays', () => {
  expect(
    xyArrayMaxY([
      { x: Float64Array.from([1]), y: Float64Array.from([3]) },
      { x: Float64Array.from([2]), y: Float64Array.from([9]) },
    ]),
  ).toBe(9);
});

test('no point at all', () => {
  expect(() => xyArrayMaxY([])).toThrow('can not process empty arrays');
  expect(() => xyArrayMaxY([{ x: [], y: [] }])).toThrow(
    'can not process empty arrays',
  );
});

test('the y must contain numbers', () => {
  expect(() =>
    // @ts-expect-error the y are checked at runtime
    xyArrayMaxY([{ x: [1], y: ['a'] }]),
  ).toThrow('input must contain numbers');
});
