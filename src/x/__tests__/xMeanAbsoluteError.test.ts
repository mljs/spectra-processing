import { xMeanAbsoluteError } from '../../index';

describe('xMeanAbsoluteError', () => {
  it('no error', () => {
    const array1 = [1, 1, 1, 1];
    expect(xMeanAbsoluteError(array1, array1)).toBeCloseTo(0);
  });

  it('error of 1', () => {
    const array1 = [1, 1, 1, 1];
    const array2 = [0, 0, 0, 0];
    expect(xMeanAbsoluteError(array1, array2)).toBeCloseTo(1);
  });

  it('different length', () => {
    const array1 = [1, 1, 1, 1];
    const array2 = [0, 0, 0, 0, 1];
    expect(() => {
      return xMeanAbsoluteError(array1, array2);
    }).toThrow(/Length of array1 and array2 must be identical/);
  });
});
