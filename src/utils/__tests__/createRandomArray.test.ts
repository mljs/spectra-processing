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
    });
    expect(array).toBeDeepCloseTo([10, 10, 10, 10, 10]);
  });
  it('uniform distribution', () => {
    let array = createRandomArray({
      mean: 10,
      range: 2,
      length: 100000,
      distribution: 'uniform',
    });
    const histogram = xHistogram(array, { nbSlots: 10 });
    for (let intensity of histogram.y) {
      expect(intensity).toBeGreaterThan(9500);
      expect(intensity).toBeLessThan(10500);
    }
  });
});
