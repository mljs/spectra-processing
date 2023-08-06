import { xSubtract } from '../../index';

describe('xSubtract', () => {
  it('test xSubtract of 2 vectors', () => {
    const array1 = [10, 11, 12, 13, 14];
    const array2 = [5, 4, 3, 2, 1];
    expect(Array.from(xSubtract(array1, array2))).toStrictEqual([
      5, 7, 9, 11, 13,
    ]);
  });

  it('test xSubtract of 2 a constant', () => {
    const array1 = [10, 11, 12, 13, 14];
    expect(Array.from(xSubtract(array1, 5))).toStrictEqual([5, 6, 7, 8, 9]);
  });

  it('test xSubtract of array and floatarray', () => {
    const array1 = new Float64Array([10, 11, 12, 13, 14]);
    const array2 = [5, 4, 3, 2, 1];
    expect(Array.from(xSubtract(array1, array2))).toStrictEqual([
      5, 7, 9, 11, 13,
    ]);
  });
});
