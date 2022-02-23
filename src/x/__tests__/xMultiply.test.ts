import { xMultiply } from '../xMultiply';

describe('xMultiply', () => {
  it('test mul of 2 vectors', () => {
    let array1 = [10, 11, 12, 13, 14];
    let array2 = [5, 4, 3, 2, 1];
    expect(Array.from(xMultiply(array1, array2))).toStrictEqual([
      50, 44, 36, 26, 14,
    ]);
  });

  it('test mul of array and floatarray', () => {
    let array1 = [10, 11, 12, 13, 14];
    let array2 = new Float64Array([5, 4, 3, 2, 1]);
    expect(Array.from(xMultiply(array1, array2))).toStrictEqual([
      50, 44, 36, 26, 14,
    ]);
  });

  it('test mul of 2 a constant', () => {
    let array1 = [10, 11, 12, 13, 14];
    expect(Array.from(xMultiply(array1, 5))).toStrictEqual([
      50, 55, 60, 65, 70,
    ]);
  });
  it('check 2 different array', () => {
    let array = [10, 11, 12, 13, 14];
    let result = xMultiply(array, 5);
    expect(array).not.toBe(result);
  });
  it('check same array', () => {
    let array = [10, 11, 12, 13, 14];
    let result = xMultiply(array, 5, { output: array });
    expect(array).toBe(result);
    expect(result).toStrictEqual([50, 55, 60, 65, 70]);
  });
});
