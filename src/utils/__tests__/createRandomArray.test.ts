import { toBeDeepCloseTo } from 'jest-matcher-deep-close-to';

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
    expect(array).toBeDeepCloseTo([10, 10, 10, 10, 10]);
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
});
