import { xAdd } from '../xAdd.js';

describe('xAdd', function () {
  it('test xAdd of 2 vectors', () => {
    let array1 = [10, 11, 12, 13, 14];
    let array2 = [5, 4, 3, 2, 1];
    expect(xAdd(array1, array2)).toStrictEqual([15, 15, 15, 15, 15]);
  });

  it('test xAdd of 2 a constant', () => {
    let array1 = [10, 11, 12, 13, 14];
    expect(xAdd(array1, 5)).toStrictEqual([15, 16, 17, 18, 19]);
  });
});
