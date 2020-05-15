import { xRotate } from '../xRotate.js';

describe('xRotate', function () {
  it('test xRotate positive', () => {
    let array = [10, 11, 12, 13, 14];
    expect(xRotate(array, 0)).toStrictEqual([10, 11, 12, 13, 14]);
    expect(xRotate(array, 2)).toStrictEqual([13, 14, 10, 11, 12]);
    expect(xRotate(array, 4)).toStrictEqual([11, 12, 13, 14, 10]);
    expect(xRotate(array, 6)).toStrictEqual([14, 10, 11, 12, 13]);
  });

  it('test xRotate negative', () => {
    let array = [10, 11, 12, 13, 14];
    expect(xRotate(array, -2)).toStrictEqual([12, 13, 14, 10, 11]);
    expect(xRotate(array, -4)).toStrictEqual([14, 10, 11, 12, 13]);
    expect(xRotate(array, -6)).toStrictEqual([11, 12, 13, 14, 10]);
  });
});
