import { xCorrelation } from '../xCorrelation.js';

describe('xCorrelation', function () {
  // wolfram alpha: xCorrelation([1,2,3],[4,5,6])
  it('2 correlated vectors', () => {
    let array1 = [1, 2, 3];
    let array2 = [4, 5, 6];
    expect(xCorrelation(array1, array2)).toBeCloseTo(1, 6);
  });

  it('2 non correlated vectors', () => {
    let array1 = [1, 2, 3];
    let array2 = [3, 2, 1];
    expect(xCorrelation(array1, array2)).toBeCloseTo(-1, 6);
  });

  it('2 random vectors', () => {
    let array1 = [1, 2, 3];
    let array2 = [2, 1, 10];
    expect(xCorrelation(array1, array2)).toBeCloseTo(0.810884854079, 6);
  });
});
