import { subtract } from '../subtract.js';

describe('subtract', function() {
  it('test subtract of 2 vectors', () => {
    let array1 = [10, 11, 12, 13, 14];
    let array2 = [5, 4, 3, 2, 1];
    expect(subtract(array1, array2)).toStrictEqual([5, 7, 9, 11, 13]);
  });

  it('test subtract of 2 a constant', () => {
    let array1 = [10, 11, 12, 13, 14];
    expect(subtract(array1, 5)).toStrictEqual([5, 6, 7, 8, 9]);
  });
});
