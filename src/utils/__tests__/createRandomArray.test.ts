import { optimize } from 'ml-spectra-fitting';
import { expect, test } from 'vitest';

import { xHistogram } from '../../x';
import { createRandomArray } from '../createRandomArray';

test('normal distribution', () => {
  const array = createRandomArray({
    mean: 10,
    standardDeviation: 0.001,
    length: 5,
    seed: 0,
  });

  expect(array).toBeDeepCloseTo([10, 10, 10, 10, 10], 1);
});

test('normal distribution default mean (0)', () => {
  const array = createRandomArray({
    standardDeviation: 1,
    length: 10000,
    seed: 0,
  });

  expect(Math.min(...array)).toBeCloseTo(-3.7159385968751244);
  expect(Math.max(...array)).toBeCloseTo(3.606967549040919);
  expect(
    array.reduce((previous, current) => previous + current, 0) / 10000,
  ).toBeCloseTo(0);
});

test('uniform distribution', () => {
  const array = createRandomArray({
    mean: 10,
    range: 2,
    length: 100000,
    distribution: 'uniform',
    seed: 0,
  });
  const histogram = xHistogram(array, { nbSlots: 10 });
  for (let i = 0; i < histogram.x.length; i++) {
    const slot = 9 + 0.1 + i * 0.2;

    expect(histogram.x[i]).toBeCloseTo(slot);
  }
  for (const y of histogram.y) {
    expect(y).toBeGreaterThan(9500);
    expect(y).toBeLessThan(10500);
  }
});

test('Testing in conjunction with spectra-fitting', () => {
  const array = createRandomArray({
    mean: 10,
    standardDeviation: 1,
    length: 100000,
    distribution: 'normal',
    seed: 0,
  });
  const histogram = xHistogram(array, { centerX: false });
  const fittedPeaks = optimize(histogram, [{ x: 10, y: 0.1 }], {
    shape: { kind: 'gaussian', fwhm: 2 },
  });

  expect(fittedPeaks.peaks[0].x).toBeDeepCloseTo(10, 2);
  expect(fittedPeaks.peaks[0].shape.fwhm).toBeDeepCloseTo(
    2 * Math.sqrt(2 * Math.log(2)),
    1,
  );
});
