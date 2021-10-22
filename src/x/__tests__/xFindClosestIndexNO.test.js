import { xFindClosestIndexNO } from '../xFindClosestIndexNO';

describe('Ordered test', () => {
  it('even', () => {
    const array = [0, 0.1, 1, 2, 3, 4];

    expect(xFindClosestIndexNO(array, 2)).toBe(3);
    expect(xFindClosestIndexNO(array, 1.4)).toBe(2);
    expect(xFindClosestIndexNO(array, 1.6)).toBe(3);
    expect(xFindClosestIndexNO(array, -1)).toBe(0);
    expect(xFindClosestIndexNO(array, 4.1)).toBe(5);
    expect(xFindClosestIndexNO(array, 0)).toBe(0);
  });

  it('even small array', () => {
    const array = [10, 11, 12, 13];

    expect(xFindClosestIndexNO(array, 2)).toBe(0);
    expect(xFindClosestIndexNO(array, 20)).toBe(3);
    expect(xFindClosestIndexNO(array, 11.4)).toBe(1);
    expect(xFindClosestIndexNO(array, 11.6)).toBe(2);
    expect(xFindClosestIndexNO(array, 10)).toBe(0);
    expect(xFindClosestIndexNO(array, 11)).toBe(1);
    expect(xFindClosestIndexNO(array, 12)).toBe(2);
    expect(xFindClosestIndexNO(array, 13)).toBe(3);
  });

  it('odd small array', () => {
    const array = [50, 60, 70];

    expect(xFindClosestIndexNO(array, 49)).toBe(0);
    expect(xFindClosestIndexNO(array, 50)).toBe(0);
    expect(xFindClosestIndexNO(array, 51)).toBe(0);

    expect(xFindClosestIndexNO(array, 59)).toBe(1);
    expect(xFindClosestIndexNO(array, 60)).toBe(1);
    expect(xFindClosestIndexNO(array, 61)).toBe(1);

    expect(xFindClosestIndexNO(array, 69)).toBe(2);
    expect(xFindClosestIndexNO(array, 70)).toBe(2);
    expect(xFindClosestIndexNO(array, 71)).toBe(2);
  });

  it('odd array of 5 elements', () => {
    const array = [50, 55, 60, 65, 70];

    expect(xFindClosestIndexNO(array, 49)).toBe(0);
    expect(xFindClosestIndexNO(array, 50)).toBe(0);
    expect(xFindClosestIndexNO(array, 51)).toBe(0);

    expect(xFindClosestIndexNO(array, 59)).toBe(2);
    expect(xFindClosestIndexNO(array, 60)).toBe(2);
    expect(xFindClosestIndexNO(array, 61)).toBe(2);

    expect(xFindClosestIndexNO(array, 69)).toBe(4);
    expect(xFindClosestIndexNO(array, 70)).toBe(4);
    expect(xFindClosestIndexNO(array, 71)).toBe(4);
  });
});

describe('Not ordered test', () => {
  it('Without decimals', () => {
    const array = [9, 4, 5, 3, 6, 1, 2, 0, 8, 7];

    expect(xFindClosestIndexNO(array, 1.3)).toBe(5);
    expect(xFindClosestIndexNO(array, 3.7)).toBe(1);
    expect(xFindClosestIndexNO(array, 5.2)).toBe(2);
    expect(xFindClosestIndexNO(array, 7.9)).toBe(8);
    expect(xFindClosestIndexNO(array, 9.5)).toBe(0);
  });

  it('With decimals', () => {
    const array = [
      9.621, 4.786, 4.843, 3.503, 1.172, 0.956, 1.831, 0.168, 4.642, 4.15,
    ];

    expect(xFindClosestIndexNO(array, 1)).toBe(5);
    expect(xFindClosestIndexNO(array, 3)).toBe(3);
    expect(xFindClosestIndexNO(array, 5)).toBe(2);
    expect(xFindClosestIndexNO(array, 7)).toBe(2);
    expect(xFindClosestIndexNO(array, 9)).toBe(0);
  });
});
