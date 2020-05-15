import { xMultiply } from '../xMultiply.js';

describe('xMultiply', function () {
  it('test mul of 2 vectors', () => {
    let array1 = [10, 11, 12, 13, 14];
    let array2 = [5, 4, 3, 2, 1];
    expect(Array.from(xMultiply(array1, array2))).toStrictEqual([
      50,
      44,
      36,
      26,
      14,
    ]);
  });

  it('test mul of 2 a constant', () => {
    let array1 = [10, 11, 12, 13, 14];
    expect(Array.from(xMultiply(array1, 5))).toStrictEqual([
      50,
      55,
      60,
      65,
      70,
    ]);
  });
});
