import { expect, test } from 'vitest';

import { mergeSortedXY } from '../mergeSortedXY.ts';

test('merges the points of every spectrum ascending by x', () => {
  const merged = mergeSortedXY([
    { x: [1, 4, 7], y: [10, 40, 70] },
    { x: [], y: [] },
    { x: [2, 4.5, 9], y: [20, 45, 90] },
    { x: [0], y: [0] },
  ]);

  expect(Array.from(merged.x)).toStrictEqual([0, 1, 2, 4, 4.5, 7, 9]);
  expect(Array.from(merged.y)).toStrictEqual([0, 10, 20, 40, 45, 70, 90]);
  expect(Array.from(merged.spectrumIndex)).toStrictEqual([3, 0, 2, 0, 2, 0, 2]);
});

test('points sharing an x are all kept', () => {
  const merged = mergeSortedXY([
    { x: [4], y: [40] },
    { x: [4], y: [41] },
  ]);

  expect(Array.from(merged.x)).toStrictEqual([4, 4]);
  expect(Array.from(merged.y).toSorted((a, b) => a - b)).toStrictEqual([
    40, 41,
  ]);
  expect(
    Array.from(merged.spectrumIndex).toSorted((a, b) => a - b),
  ).toStrictEqual([0, 1]);
});

test('no data', () => {
  const merged = mergeSortedXY([]);

  expect(Array.from(merged.x)).toStrictEqual([]);
  expect(Array.from(merged.spectrumIndex)).toStrictEqual([]);
});

test('x values must be ascending', () => {
  expect(() => mergeSortedXY([{ x: [3, 1], y: [1, 1] }])).toThrow(
    'x values of the spectrum 0 must be ascending',
  );
});

// Thirty spectra or more are merged by ordering the concatenated points instead of
// by the heap, so the cases below have to reach that many to exercise it.
const MANY_SPECTRA = 30;

/**
 * Builds spectra whose x values interleave, one point of each per unit.
 * @param numberOfSpectra - how many spectra.
 * @returns the spectra.
 */
function interleavedSpectra(numberOfSpectra: number) {
  return Array.from({ length: numberOfSpectra }, (_, spectrum) => ({
    x: [spectrum / numberOfSpectra, 1 + spectrum / numberOfSpectra],
    y: [spectrum, 100 + spectrum],
  }));
}

test('many spectra are merged ascending by x', () => {
  const merged = mergeSortedXY(interleavedSpectra(MANY_SPECTRA));

  expect(merged.x).toHaveLength(2 * MANY_SPECTRA);
  expect(Array.from(merged.x)).toStrictEqual(
    Array.from(merged.x).toSorted((a, b) => a - b),
  );
  // Each spectrum contributes its low point, in order, then its high point.
  expect(Array.from(merged.spectrumIndex)).toStrictEqual([
    ...Array.from({ length: MANY_SPECTRA }, (_, i) => i),
    ...Array.from({ length: MANY_SPECTRA }, (_, i) => i),
  ]);
  expect(Array.from(merged.y)).toStrictEqual([
    ...Array.from({ length: MANY_SPECTRA }, (_, i) => i),
    ...Array.from({ length: MANY_SPECTRA }, (_, i) => 100 + i),
  ]);
});

test('both strategies agree on the same points', () => {
  // Empty spectra contribute no point and keep the indices of the real ones, so
  // padding to the threshold sends the very same data through the other strategy.
  const spectra = interleavedSpectra(10);
  const padded = [
    ...spectra,
    ...Array.from({ length: MANY_SPECTRA - spectra.length }, () => ({
      x: [] as number[],
      y: [] as number[],
    })),
  ];

  expect(mergeSortedXY(padded)).toStrictEqual(mergeSortedXY(spectra));
});

test('many spectra still reject descending x values', () => {
  const spectra = interleavedSpectra(MANY_SPECTRA);
  spectra[7].x = [5, 2];

  expect(() => mergeSortedXY(spectra)).toThrow(
    'x values of the spectrum 7 must be ascending',
  );
});

test('many spectra keep every point sharing an x', () => {
  const spectra = Array.from({ length: MANY_SPECTRA }, (_, spectrum) => ({
    x: [4],
    y: [spectrum],
  }));
  const merged = mergeSortedXY(spectra);

  expect(Array.from(merged.x)).toStrictEqual(
    Array.from({ length: MANY_SPECTRA }, () => 4),
  );
  expect(Array.from(merged.y).toSorted((a, b) => a - b)).toStrictEqual(
    Array.from({ length: MANY_SPECTRA }, (_, i) => i),
  );
});

test('many spectra including empty ones', () => {
  const spectra = interleavedSpectra(MANY_SPECTRA);
  spectra[3] = { x: [], y: [] };
  const merged = mergeSortedXY(spectra);

  expect(merged.x).toHaveLength(2 * MANY_SPECTRA - 2);
  expect(Array.from(merged.spectrumIndex)).not.toContain(3);
});
