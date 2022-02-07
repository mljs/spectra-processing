import { xSubtract } from '../xSubtract';

describe('xSubtract', () => {
  it('test xSubtract of 2 vectors', () => {
    let array1 = [10, 11, 12, 13, 14];
    let array2 = [5, 4, 3, 2, 1];
    expect(Array.from(xSubtract(array1, array2))).toStrictEqual([
      5, 7, 9, 11, 13,
    ]);
  });

  it('test xSubtract of 2 a constant', () => {
    let array1 = [10, 11, 12, 13, 14];
    expect(Array.from(xSubtract(array1, 5))).toStrictEqual([5, 6, 7, 8, 9]);
  });

  it('test xSubtract of array and floatarray', () => {
    let array1 = new Float32Array([10, 11, 12, 13, 14]);
    let array2 = [5, 4, 3, 2, 1];
    expect(Array.from(xSubtract(array1, array2))).toStrictEqual([
      5, 7, 9, 11, 13,
    ]);
  });
});
