import { toBeDeepCloseTo } from 'jest-matcher-deep-close-to';

import { createStepArray } from '../../index';

expect.extend({ toBeDeepCloseTo });

describe('createStepArray', () => {
  it('case when we specify the step', () => {
    let result = createStepArray({
      from: 1,
      step: 10,
      length: 10,
    });

    expect(result).toBeDeepCloseTo([1, 11, 21, 31, 41, 51, 61, 71, 81, 91]);
  });
});
