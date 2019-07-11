import { arrayFindClosestIndex } from '../arrayFindClosestIndex.js';

describe('arrayFindClosestIndex', function () {
  it('test arrayFindClosestIndex even', () => {
    let array = [0, 0.1, 1, 2, 3, 4];

    expect(arrayFindClosestIndex(array, 2)).toBe(3);
    expect(arrayFindClosestIndex(array, 1.4)).toBe(2);
    expect(arrayFindClosestIndex(array, 1.6)).toBe(3);
    expect(arrayFindClosestIndex(array, -1)).toBe(0);
    expect(arrayFindClosestIndex(array, 4.1)).toBe(5);
    expect(arrayFindClosestIndex(array, 0)).toBe(0);
  });

  it('test arrayFindClosestIndex even small array', () => {
    let array = [10, 11, 12, 13];

    expect(arrayFindClosestIndex(array, 2)).toBe(0);
    expect(arrayFindClosestIndex(array, 20)).toBe(3);
    expect(arrayFindClosestIndex(array, 11.4)).toBe(1);

    expect(arrayFindClosestIndex(array, 11.6)).toBe(2);
    expect(arrayFindClosestIndex(array, 10)).toBe(0);
    expect(arrayFindClosestIndex(array, 11)).toBe(1);
    expect(arrayFindClosestIndex(array, 12)).toBe(2);
    expect(arrayFindClosestIndex(array, 13)).toBe(3);
  });

  it('test arrayFindClosestIndex odd small array', () => {
    let array = [50, 60, 70];

    expect(arrayFindClosestIndex(array, 49)).toBe(0);
    expect(arrayFindClosestIndex(array, 50)).toBe(0);
    expect(arrayFindClosestIndex(array, 51)).toBe(0);

    expect(arrayFindClosestIndex(array, 59)).toBe(1);
    expect(arrayFindClosestIndex(array, 60)).toBe(1);
    expect(arrayFindClosestIndex(array, 61)).toBe(1);

    expect(arrayFindClosestIndex(array, 69)).toBe(2);
    expect(arrayFindClosestIndex(array, 70)).toBe(2);
    expect(arrayFindClosestIndex(array, 71)).toBe(2);
  });

  it('test arrayFindClosestIndex odd array of 5 elements', () => {
    let array = [50, 55, 60, 65, 70];

    expect(arrayFindClosestIndex(array, 49)).toBe(0);
    expect(arrayFindClosestIndex(array, 50)).toBe(0);
    expect(arrayFindClosestIndex(array, 51)).toBe(0);

    expect(arrayFindClosestIndex(array, 59)).toBe(2);
    expect(arrayFindClosestIndex(array, 60)).toBe(2);
    expect(arrayFindClosestIndex(array, 61)).toBe(2);

    expect(arrayFindClosestIndex(array, 69)).toBe(4);
    expect(arrayFindClosestIndex(array, 70)).toBe(4);
    expect(arrayFindClosestIndex(array, 71)).toBe(4);
  });
});
