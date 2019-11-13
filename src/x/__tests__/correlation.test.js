import { correlation } from '../correlation.js';

describe('correlation', function() {
  // wolfram alpha: correlation([1,2,3],[4,5,6])
  it('2 correlated vectors', () => {
    let array1 = [1, 2, 3];
    let array2 = [4, 5, 6];
    expect(correlation(array1, array2)).toBeCloseTo(1, 6);
  });

  it('2 non correlated vectors', () => {
    let array1 = [1, 2, 3];
    let array2 = [3, 2, 1];
    expect(correlation(array1, array2)).toBeCloseTo(-1, 6);
  });

  it('2 random vectors', () => {
    let array1 = [1, 2, 3];
    let array2 = [2, 1, 10];
    expect(correlation(array1, array2)).toBeCloseTo(0.810884854079, 6);
  });
});
