import { toBeDeepCloseTo } from 'jest-matcher-deep-close-to';

import { createNormalRandomArray } from '../createNormalRandomArray';

expect.extend({ toBeDeepCloseTo });

describe('createRandomXArray', () => {
  it('case when we sample within a specific range with log distribution and include start and end points', () => {
    let result = createNormalRandomArray({
      mean: 10,
      standardDeviation: 0.001,
      length: 5,
    });
    expect(result).toBeDeepCloseTo([10, 10, 10, 10, 10]);
  });
});
