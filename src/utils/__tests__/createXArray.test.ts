import { toBeDeepCloseTo } from 'jest-matcher-deep-close-to';

import { createXArray } from '../createXArray';

expect.extend({ toBeDeepCloseTo });

describe('createXArray', () => {
  it('case when we sample within a specific range with log distribution and include start and end points', () => {
    let result = createXArray({
      from: 2,
      to: 32,
      length: 5,
      includeFrom: true,
      includeTo: true,
      distribution: 'log',
    });
    expect(result).toBeDeepCloseTo([2, 4, 8, 16, 32]);
  });

  it('case when we sample within a specific range with log distribution and include start point but not end point', () => {
    let result = createXArray({
      from: 2,
      to: 32,
      length: 5,
      includeFrom: true,
      includeTo: false,
      distribution: 'log',
    });
    expect(result).toBeDeepCloseTo([
      2, 3.4822022531844965, 6.062866266041592, 10.556063286183154,
      18.379173679952558,
    ]);
  });

  it('case when we sample within a specific range with log distribution and include end point but not start point', () => {
    let result = createXArray({
      from: 2,
      to: 32,
      length: 5,
      includeFrom: false,
      includeTo: true,
      distribution: 'log',
    });
    expect(result).toBeDeepCloseTo([
      3.4822022531844965, 6.062866266041592, 10.556063286183154,
      18.379173679952558, 32,
    ]);
  });

  it('case when we sample within a speci]fic range with uniform distribution and include start and end points', () => {
    let result = createXArray({
      from: 1,
      to: 100,
      length: 10,
      includeFrom: true,
      includeTo: true,
      distribution: 'uniform',
    });
    expect(result).toBeDeepCloseTo([1, 12, 23, 34, 45, 56, 67, 78, 89, 100]);
  });

  it('case when we sample within a specific range with uniform distribution and include start point but do not include end point', () => {
    let result = createXArray({
      from: 1,
      to: 100,
      length: 10,
      includeFrom: true,
      includeTo: false,
      distribution: 'uniform',
    });
    expect(result).toBeDeepCloseTo([
      1, 10.9, 20.8, 30.7, 40.6, 50.5, 60.4, 70.3, 80.2, 90.1,
    ]);
  });

  it('case when we sample within a specific range with uniform distribution and include end point but do not include start point', () => {
    let result = createXArray({
      from: 1,
      to: 100,
      length: 10,
      includeFrom: false,
      includeTo: true,
      distribution: 'uniform',
    });
    expect(result).toBeDeepCloseTo([
      10.9, 20.8, 30.7, 40.6, 50.5, 60.4, 70.3, 80.2, 90.1, 100,
    ]);
  });

  it('case when we sample within a specific range with uniform distribution and do not include start point or end point', () => {
    let result = createXArray({
      from: 1,
      to: 100,
      length: 10,
      includeFrom: false,
      includeTo: false,
      distribution: 'uniform',
    });

    expect(result).toBeDeepCloseTo([10, 19, 28, 37, 46, 55, 64, 73, 82, 91]);
  });

  it('case when we choose a distribution other than uniform or log', () => {
    expect(() => {
      createXArray({
        from: 1,
        to: 100,
        length: 10,
        distribution: 'other',
      });
    }).toThrow(Error);
  });

  it('case when we specify both the "step" and "to"', () => {
    expect(() => {
      createXArray({
        from: 1,
        to: 100,
        step: 1,
        length: 10,
        distribution: 'uniform',
      });
    }).toThrow(Error);
  });

  it('case when we specify the step', () => {
    let result = createXArray({
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
    let result = createXArray({
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
    let result = createXArray({
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
