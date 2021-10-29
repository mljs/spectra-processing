import { toMatchCloseTo } from 'jest-matcher-deep-close-to';

import { xyCumulativeDistributionStatistics } from '../xyCumulativeDistributionStatistics';

expect.extend({ toMatchCloseTo });

describe('xyCumulativeDistributionStatistics', () => {
  it('simple case', () => {
    let data = {
      x: [0, 1, 2, 3, 4],
      y: [0, 1, 1, 1, 1],
    };

    let result = xyCumulativeDistributionStatistics(data);

    expect(result).toStrictEqual({
      x0: 0,
      x25: 1,
      x50: 2,
      x75: 3,
      x100: 4,
      xMode: 1,
      xMean: 2.5,
    });
  });

  it('less simple case', () => {
    let data = {
      x: [0, 1, 2, 3, 4, 5],
      y: [1, 2, 3, 3, 2, 1],
    };

    let result = xyCumulativeDistributionStatistics(data);

    expect(result).toStrictEqual({
      x0: 0,
      x25: 1,
      x50: 2,
      x75: 3,
      x100: 5,
      xMode: 2,
      xMean: 2.5,
    });
  });

  it('case with interpolate x', () => {
    let data = {
      x: [0, 1, 2, 3, 4, 5, 6],
      y: [1, 2, 2, 2, 2, 2, 1],
    };

    let result = xyCumulativeDistributionStatistics(data);

    expect(result).toStrictEqual({
      x0: 0,
      x25: 1,
      x50: 2.5,
      x75: 4,
      x100: 6,
      xMode: 1,
      xMean: 3,
    });
  });

  it('case with interpolate x giving non half integer number', () => {
    let data = {
      x: [0, 1, 2, 3, 4, 5, 6],
      y: [1, 2, 2.5, 2, 1.5, 2, 1],
    };

    let result = xyCumulativeDistributionStatistics(data);

    expect(result).toMatchCloseTo({
      x0: 0,
      x25: 1,
      x50: 2.25,
      x75: 4,
      x100: 6,
      xMode: 2,
      xMean: 2.9166666666666665,
    });
  });
});
