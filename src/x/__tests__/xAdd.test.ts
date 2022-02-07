import { xAdd } from '../xAdd';

describe('xAdd', () => {
  it('test xAdd of 2 vectors', () => {
    let array1 = [10, 11, 12, 13, 14];
    let array2 = [5, 4, 3, 2, 1];
    expect(Array.from(xAdd(array1, array2))).toStrictEqual([
      15, 15, 15, 15, 15,
    ]);
  });

  it('test xAdd of 2 a constant', () => {
    let array1 = [10, 11, 12, 13, 14];
    expect(Array.from(xAdd(array1, 5))).toStrictEqual([15, 16, 17, 18, 19]);
  });

  it('test xAdd of array and floatarray', () => {
    let array1 = [10, 11, 12, 13, 14];
    let array2 = new Float32Array([5, 4, 3, 2, 1]);
    expect(Array.from(xAdd(array1, array2))).toStrictEqual([
      15, 15, 15, 15, 15,
    ]);
  });
});
