import { rotate } from '../rotate.js';

describe('rotate', function() {
  it('test rotate positive', () => {
    let array = [10, 11, 12, 13, 14];
    expect(rotate(array, 0)).toStrictEqual([10, 11, 12, 13, 14]);
    expect(rotate(array, 2)).toStrictEqual([13, 14, 10, 11, 12]);
    expect(rotate(array, 4)).toStrictEqual([11, 12, 13, 14, 10]);
    expect(rotate(array, 6)).toStrictEqual([14, 10, 11, 12, 13]);
  });

  it('test rotate negative', () => {
    let array = [10, 11, 12, 13, 14];
    expect(rotate(array, -2)).toStrictEqual([12, 13, 14, 10, 11]);
    expect(rotate(array, -4)).toStrictEqual([14, 10, 11, 12, 13]);
    expect(rotate(array, -6)).toStrictEqual([11, 12, 13, 14, 10]);
  });
});
