import { xAdd } from '../../index';

describe('xAdd', () => {
  it('test xAdd of 2 vectors', () => {
    const array1 = [10, 11, 12, 13, 14];
    const array2 = [5, 4, 3, 2, 1];
    expect(Array.from(xAdd(array1, array2))).toStrictEqual([
      15, 15, 15, 15, 15,
    ]);
  });

  it('test xAdd of 2 a constant', () => {
    const array1 = [10, 11, 12, 13, 14];
    expect(Array.from(xAdd(array1, 5))).toStrictEqual([15, 16, 17, 18, 19]);
  });

  it('test xAdd of array and floatarray', () => {
    const array1 = [10, 11, 12, 13, 14];
    const array2 = new Float64Array([5, 4, 3, 2, 1]);
    expect(Array.from(xAdd(array1, array2))).toStrictEqual([
      15, 15, 15, 15, 15,
    ]);
  });
});
