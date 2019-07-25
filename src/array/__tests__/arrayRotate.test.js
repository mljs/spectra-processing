import { arrayRotate } from '../arrayRotate.js';

describe('arrayRotate', function () {
  it('test arrayRotate positive', () => {
    let array = [10, 11, 12, 13, 14];
    expect(arrayRotate(array, 0)).toStrictEqual([10, 11, 12, 13, 14]);
    expect(arrayRotate(array, 2)).toStrictEqual([13, 14, 10, 11, 12]);
    expect(arrayRotate(array, 4)).toStrictEqual([11, 12, 13, 14, 10]);
    expect(arrayRotate(array, 6)).toStrictEqual([14, 10, 11, 12, 13]);
  });

  it('test arrayRotate negative', () => {
    let array = [10, 11, 12, 13, 14];
    expect(arrayRotate(array, -2)).toStrictEqual([12, 13, 14, 10, 11]);
    expect(arrayRotate(array, -4)).toStrictEqual([14, 10, 11, 12, 13]);
    expect(arrayRotate(array, -6)).toStrictEqual([11, 12, 13, 14, 10]);
  });
});
