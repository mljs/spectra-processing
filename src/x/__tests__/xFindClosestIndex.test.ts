import { xFindClosestIndex } from '../../index';

describe('Find closest index in sorted array test', () => {
  it('even', () => {
    const array = [0, 0.1, 1, 2, 3, 4];

    expect(xFindClosestIndex(array, 2)).toBe(3);
    expect(xFindClosestIndex(array, 1.4)).toBe(2);
    expect(xFindClosestIndex(array, 1.6)).toBe(3);
    expect(xFindClosestIndex(array, -1)).toBe(0);
    expect(xFindClosestIndex(array, 4.1)).toBe(5);
    expect(xFindClosestIndex(array, 0)).toBe(0);
  });

  it('even small array', () => {
    const array = [10, 11, 12, 13];

    expect(xFindClosestIndex(array, 2)).toBe(0);
    expect(xFindClosestIndex(array, 20)).toBe(3);
    expect(xFindClosestIndex(array, 11.4)).toBe(1);
    expect(xFindClosestIndex(array, 11.6)).toBe(2);
    expect(xFindClosestIndex(array, 10)).toBe(0);
    expect(xFindClosestIndex(array, 11)).toBe(1);
    expect(xFindClosestIndex(array, 12)).toBe(2);
    expect(xFindClosestIndex(array, 13)).toBe(3);
  });

  it('odd small array', () => {
    const array = [50, 60, 70];

    expect(xFindClosestIndex(array, 49)).toBe(0);
    expect(xFindClosestIndex(array, 50)).toBe(0);
    expect(xFindClosestIndex(array, 51)).toBe(0);

    expect(xFindClosestIndex(array, 59)).toBe(1);
    expect(xFindClosestIndex(array, 60)).toBe(1);
    expect(xFindClosestIndex(array, 61)).toBe(1);

    expect(xFindClosestIndex(array, 69)).toBe(2);
    expect(xFindClosestIndex(array, 70)).toBe(2);
    expect(xFindClosestIndex(array, 71)).toBe(2);
  });

  it('odd array of 5 elements', () => {
    const array = [50, 55, 60, 65, 70];

    expect(xFindClosestIndex(array, 49)).toBe(0);
    expect(xFindClosestIndex(array, 50)).toBe(0);
    expect(xFindClosestIndex(array, 51)).toBe(0);

    expect(xFindClosestIndex(array, 59)).toBe(2);
    expect(xFindClosestIndex(array, 60)).toBe(2);
    expect(xFindClosestIndex(array, 61)).toBe(2);

    expect(xFindClosestIndex(array, 69)).toBe(4);
    expect(xFindClosestIndex(array, 70)).toBe(4);
    expect(xFindClosestIndex(array, 71)).toBe(4);
  });
});

describe('Find closest index in not sorted array test', () => {
  it('Without decimals', () => {
    const array = [9, 4, 5, 3, 6, 1, 2, 0, 8, 7];

    expect(xFindClosestIndex(array, 1.3, { sorted: false })).toBe(5);
    expect(xFindClosestIndex(array, 3.7, { sorted: false })).toBe(1);
    expect(xFindClosestIndex(array, 5.2, { sorted: false })).toBe(2);
    expect(xFindClosestIndex(array, 7.9, { sorted: false })).toBe(8);
    expect(xFindClosestIndex(array, 9.5, { sorted: false })).toBe(0);
  });

  it('With decimals', () => {
    const array = [
      9.621, 4.786, 4.843, 3.503, 1.172, 0.956, 1.831, 0.168, 4.642, 4.15,
    ];

    expect(xFindClosestIndex(array, 1, { sorted: false })).toBe(5);
    expect(xFindClosestIndex(array, 3, { sorted: false })).toBe(3);
    expect(xFindClosestIndex(array, 5, { sorted: false })).toBe(2);
    expect(xFindClosestIndex(array, 7, { sorted: false })).toBe(2);
    expect(xFindClosestIndex(array, 9, { sorted: false })).toBe(0);
  });
});
