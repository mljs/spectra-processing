import { toBeDeepCloseTo } from 'jest-matcher-deep-close-to';
import { optimize } from 'ml-spectra-fitting';

import { xHistogram } from '../../x/xHistogram';
import { createRandomArray } from '../createRandomArray';

expect.extend({ toBeDeepCloseTo });

describe('createRandomXArray', () => {
  it('normal distribution', () => {
    let array = createRandomArray({
      mean: 10,
      standardDeviation: 0.001,
      length: 5,
      seed: 0,
    });
    expect(array).toBeDeepCloseTo([10, 10, 10, 10, 10], 1);
  });

  it('normal distribution default mean (0)', () => {
    let array = createRandomArray({
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

  it('uniform distribution', () => {
    let array = createRandomArray({
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
    for (let y of histogram.y) {
      expect(y).toBeGreaterThan(9500);
      expect(y).toBeLessThan(10500);
    }
  });

  it('Testing in conjunction with spectra-fitting', () => {
    let array = createRandomArray({
      mean: 10,
      standardDeviation: 1,
      length: 100000,
      distribution: 'normal',
      seed: 0,
    });
    const histogram = xHistogram(array, { centerX: false });
    let fittedPeaks = optimize(histogram, [{ x: 10, y: 0.1 }], {
      shape: { kind: 'gaussian', fwhm: 2 },
    });
    expect(fittedPeaks.peaks[0].x).toBeDeepCloseTo(10, 2);
    expect(fittedPeaks.peaks[0].shape.fwhm).toBeDeepCloseTo(
      2 * Math.sqrt(2 * Math.log(2)),
      1,
    );
  });
});
