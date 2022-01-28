import { xSampling } from '../xSampling';

describe('test xSampling', () => {
  it('testing on array', () => {
    let array = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    let result = xSampling({ nbPoints: 3 }, array);
    expect(result).toStrictEqual([0, 4, 8]);
  });

  it('testing on array where nbPoints does not divide the length of the array', () => {
    let array = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    let result = xSampling({ nbPoints: 4 }, array);
    expect(result).toStrictEqual([0, 2, 4, 6]);
  });

  it('when nbPoints is bigger than the length of the array, should throw an error', () => {
    let array = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    expect(() => {
      xSampling({}, array);
    }).toThrow(Error);
  });

  it('case when we sample within a specific range with log distribution and include start and end points', () => {
    let result = xSampling({
      startPoint: 1,
      endPoint: 5,
      nbPoints: 5,
      includeEnd: true,
      includeStart: true,
      distribution: 'log',
      base: 2,
    });

    expect(result).toStrictEqual([2, 4, 8, 16, 32]);
  });

  it('case when we sample within a specific range with uniform distribution and include start and end points', () => {
    let result = xSampling({
      startPoint: 1,
      endPoint: 100,
      nbPoints: 10,
      includeEnd: true,
      includeStart: true,
      distribution: 'uniform',
    });

    expect(result).toStrictEqual([1, 12, 23, 34, 45, 56, 67, 78, 89, 100]);
  });

  it('case when we sample within a specific range with uniform distribution and include start point but do not include end point', () => {
    let result = xSampling({
      startPoint: 1,
      endPoint: 100,
      nbPoints: 10,
      includeStart: true,
      includeEnd: false,
      distribution: 'uniform',
    });

    expect(result).toStrictEqual([
      1, 10.9, 20.8, 30.700000000000003, 40.6, 50.5, 60.4, 70.3, 80.2,
      90.10000000000001,
    ]);
  });

  it('case when we sample within a specific range with uniform distribution and include end point but do not include start point', () => {
    let result = xSampling({
      startPoint: 1,
      endPoint: 100,
      nbPoints: 10,
      includeStart: false,
      includeEnd: true,
      distribution: 'uniform',
    });

    expect(result).toStrictEqual([
      10.9, 20.8, 30.700000000000003, 40.6, 50.5, 60.4, 70.3, 80.2,
      90.10000000000001, 100.00000000000001,
    ]);
  });

  it('case when we sample within a specific range with uniform distribution and do not include start point or end point', () => {
    let result = xSampling({
      startPoint: 1,
      endPoint: 100,
      nbPoints: 10,
      includeStart: false,
      includeEnd: false,
      distribution: 'uniform',
    });

    expect(result).toStrictEqual([10, 19, 28, 37, 46, 55, 64, 73, 82, 91]);
  });

  it('case when we choose a distribution other than uniform or log', () => {
    expect(() => {
      xSampling({
        startPoint: 1,
        endPoint: 100,
        nbPoints: 10,
        includeEnd: false,
        distribution: 'other',
      });
    }).toThrow(Error);
  });
});
