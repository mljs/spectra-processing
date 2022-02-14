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

    expect(result).toBeDeepCloseTo([1, 11, 21, 31, 41, 51, 61, 71, 81, 91]);
  });
});
