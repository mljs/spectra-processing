import { findClosestIndex } from '../findClosestIndex.js';

describe('findClosestIndex', function() {
  it('test findClosestIndex even', () => {
    let array = [0, 0.1, 1, 2, 3, 4];

    expect(findClosestIndex(array, 2)).toBe(3);
    expect(findClosestIndex(array, 1.4)).toBe(2);
    expect(findClosestIndex(array, 1.6)).toBe(3);
    expect(findClosestIndex(array, -1)).toBe(0);
    expect(findClosestIndex(array, 4.1)).toBe(5);
    expect(findClosestIndex(array, 0)).toBe(0);
  });

  it('test findClosestIndex even small array', () => {
    let array = [10, 11, 12, 13];

    expect(findClosestIndex(array, 2)).toBe(0);
    expect(findClosestIndex(array, 20)).toBe(3);
    expect(findClosestIndex(array, 11.4)).toBe(1);

    expect(findClosestIndex(array, 11.6)).toBe(2);
    expect(findClosestIndex(array, 10)).toBe(0);
    expect(findClosestIndex(array, 11)).toBe(1);
    expect(findClosestIndex(array, 12)).toBe(2);
    expect(findClosestIndex(array, 13)).toBe(3);
  });

  it('test findClosestIndex odd small array', () => {
    let array = [50, 60, 70];

    expect(findClosestIndex(array, 49)).toBe(0);
    expect(findClosestIndex(array, 50)).toBe(0);
    expect(findClosestIndex(array, 51)).toBe(0);

    expect(findClosestIndex(array, 59)).toBe(1);
    expect(findClosestIndex(array, 60)).toBe(1);
    expect(findClosestIndex(array, 61)).toBe(1);

    expect(findClosestIndex(array, 69)).toBe(2);
    expect(findClosestIndex(array, 70)).toBe(2);
    expect(findClosestIndex(array, 71)).toBe(2);
  });

  it('test findClosestIndex odd array of 5 elements', () => {
    let array = [50, 55, 60, 65, 70];

    expect(findClosestIndex(array, 49)).toBe(0);
    expect(findClosestIndex(array, 50)).toBe(0);
    expect(findClosestIndex(array, 51)).toBe(0);

    expect(findClosestIndex(array, 59)).toBe(2);
    expect(findClosestIndex(array, 60)).toBe(2);
    expect(findClosestIndex(array, 61)).toBe(2);

    expect(findClosestIndex(array, 69)).toBe(4);
    expect(findClosestIndex(array, 70)).toBe(4);
    expect(findClosestIndex(array, 71)).toBe(4);
  });
});
