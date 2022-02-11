import { toBeDeepCloseTo } from 'jest-matcher-deep-close-to';

import { createXArrayWithStep } from '../createXArrayWithStep';

expect.extend({ toBeDeepCloseTo });

describe('createXArray', () => {
  it('case when we specify the step', () => {
    let result = createXArrayWithStep({
      from: 1,
      step: 10,
      length: 10,
      distribution: 'uniform',
    });

    expect(result).toBeDeepCloseTo([
      1, 12.11111111111111, 23.22222222222222, 34.33333333333333,
      45.44444444444444, 56.55555555555556, 67.66666666666666,
      78.77777777777777, 89.88888888888889, 101,
    ]);
  });

  it('case when we specify the step and do not include the first value but include the last value', () => {
    let result = createXArrayWithStep({
      from: 1,
      step: 10,
      length: 10,
      includeFrom: false,
      includeTo: true,
      distribution: 'uniform',
    });

    expect(result).toBeDeepCloseTo([11, 21, 31, 41, 51, 61, 71, 81, 91, 101]);
  });

  it('case when we specify the step and do not include the first value nor the last value', () => {
    let result = createXArrayWithStep({
      from: 1,
      step: 10,
      length: 10,
      includeFrom: false,
      includeTo: false,
      distribution: 'uniform',
    });

    expect(result).toBeDeepCloseTo([
      10.090909090909092, 19.181818181818183, 28.272727272727273,
      37.36363636363637, 46.45454545454546, 55.54545454545455,
      64.63636363636364, 73.72727272727273, 82.81818181818183,
      91.90909090909092,
    ]);
  });
});
