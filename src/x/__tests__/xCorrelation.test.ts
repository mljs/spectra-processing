import { xCorrelation } from '../../index';

describe('xCorrelation', () => {
  // wolfram alpha: xCorrelation([1,2,3],[4,5,6])
  it('2 correlated vectors', () => {
    const array1 = [1, 2, 3];
    const array2 = [4, 5, 6];
    expect(xCorrelation(array1, array2)).toBeCloseTo(1, 6);
  });

  it('2 non correlated vectors', () => {
    const array1 = [1, 2, 3];
    const array2 = [3, 2, 1];
    expect(xCorrelation(array1, array2)).toBeCloseTo(-1, 6);
  });

  it('2 identical vector', () => {
    const array1 = [1, 2, 3];
    const array2 = [1, 2, 3];
    expect(xCorrelation(array1, array2)).toBeCloseTo(1, 6);
  });

  it('2 random vectors', () => {
    const array1 = [1, 2, 3];
    const array2 = [2, 1, 10];
    expect(xCorrelation(array1, array2)).toBeCloseTo(0.810884854079, 6);
  });
});
