import { xDivide } from '../../index';

describe('divide', () => {
  it('test divide of 2 vectors', () => {
    const array1 = [10, 15, 20, 25, 30];
    const array2 = [2, 3, 4, 5, 6];
    expect(Array.from(xDivide(array1, array2))).toStrictEqual([5, 5, 5, 5, 5]);
  });

  it('test divide of Array and FloatArray', () => {
    const array1 = [10, 15, 20, 25, 30];
    const array2 = new Float64Array([2, 3, 4, 5, 6]);
    expect(Array.from(xDivide(array1, array2))).toStrictEqual([5, 5, 5, 5, 5]);
  });
  it('test mul of 2 a constant', () => {
    const array1 = [10, 15, 20, 25, 30];
    expect(Array.from(xDivide(array1, 5))).toStrictEqual([2, 3, 4, 5, 6]);
  });
});
