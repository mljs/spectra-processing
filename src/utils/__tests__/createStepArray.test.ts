import { createStepArray } from '../../index';

describe('createStepArray', () => {
  it('case when we specify the step', () => {
    const result = createStepArray({
      from: 1,
      step: 10,
      length: 10,
    });

    expect(result).toBeDeepCloseTo([1, 11, 21, 31, 41, 51, 61, 71, 81, 91]);
  });
});
