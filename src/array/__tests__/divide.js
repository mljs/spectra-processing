import { divide } from '../divide.js';

describe('divide', function () {
  it('test divide of 2 vectors', () => {
    let array1 = [10, 15, 20, 25, 30];
    let array2 = [2, 3, 4, 5, 6];
    expect(divide(array1, array2)).toStrictEqual([5, 5, 5, 5, 5]);
  });

  it('test mul of 2 a constant', () => {
    let array1 = [10, 15, 20, 25, 30];
    expect(divide(array1, 5)).toStrictEqual([2, 3, 4, 5, 6]);
  });
});
