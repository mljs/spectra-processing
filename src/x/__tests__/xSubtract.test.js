import { xSubtract } from '../xSubtract.js';

describe('xSubtract', function () {
  it('test xSubtract of 2 vectors', () => {
    let array1 = [10, 11, 12, 13, 14];
    let array2 = [5, 4, 3, 2, 1];
    expect(xSubtract(array1, array2)).toStrictEqual([5, 7, 9, 11, 13]);
  });

  it('test xSubtract of 2 a constant', () => {
    let array1 = [10, 11, 12, 13, 14];
    expect(xSubtract(array1, 5)).toStrictEqual([5, 6, 7, 8, 9]);
  });
});
