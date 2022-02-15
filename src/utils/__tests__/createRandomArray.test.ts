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
    });
    expect(array).toBeDeepCloseTo([10, 10, 10, 10, 10], 1);
  });

  it('uniform distribution', () => {
    let array = createRandomArray({
      mean: 10,
      range: 2,
      length: 100000,
      distribution: 'uniform',
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
      range: 2,
      length: 100000,
      distribution: 'uniform',
    });
    const histogram = xHistogram(array, { centerX: false });
    let fittedPeaks = optimize(
      histogram,
      [{ x: 10, y: 0.1, width: 2, fwhm: 3 }],
      { shape: { kind: 'gaussian' } },
    );

    expect(fittedPeaks.error).toBeDeepCloseTo(0.4916571856669893, 1);
    expect(fittedPeaks.peaks[0].x).toBeDeepCloseTo(10.14761671663178, 1);
    expect(fittedPeaks.peaks[0].y).toBeDeepCloseTo(393.31306945371506, 1);
    expect(fittedPeaks.peaks[0].width).toBeDeepCloseTo(2, 1);
    expect(fittedPeaks.peaks[0].fwhm).toBeDeepCloseTo(12, 1);
  });
});
