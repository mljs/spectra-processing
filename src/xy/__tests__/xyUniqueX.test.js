import xyUniqueX from '../xyUniqueX.js';

describe('xyUniqueX', function () {
  it('unsorted sum', function () {
    let x = [0, 0, 0, 2, 4, 0, 1, 2];
    let y = [1, 1, 1, 2, 7, 1, 9, 4];
    expect(
      xyUniqueX({ x, y }, { algorithm: 'sum', isSorted: false }),
    ).toStrictEqual({
      x: [0, 1, 2, 4],
      y: [4, 9, 6, 7],
    });
  });

  it('unsorted avg', function () {
    let x = [0, 0, 0, 2, 4, 0, 1, 2];
    let y = [1, 1, 1, 2, 7, 1, 9, 4];
    expect(
      xyUniqueX({ x, y }, { algorithm: 'average', isSorted: false }),
    ).toStrictEqual({ x: [0, 1, 2, 4], y: [1, 9, 3, 7] });
  });

  it('sorted sum', function () {
    let x = [0, 0, 0, 0, 1, 2, 2, 4];
    let y = [1, 1, 1, 1, 9, 2, 4, 7];
    expect(
      xyUniqueX({ x, y }, { algorithm: 'sum', isSorted: true }),
    ).toStrictEqual({
      x: [0, 1, 2, 4],
      y: [4, 9, 6, 7],
    });
  });

  it('sorted sum 2', function () {
    let x = [0, 0, 0, 0, 1, 2, 2, 4, 4];
    let y = [1, 1, 1, 1, 9, 2, 4, 7, 3];
    expect(
      xyUniqueX({ x, y }, { algorithm: 'sum', isSorted: true }),
    ).toStrictEqual({
      x: [0, 1, 2, 4],
      y: [4, 9, 6, 10],
    });
  });

  it('sorted avg', function () {
    let x = [0, 0, 0, 0, 1, 2, 2, 4];
    let y = [1, 1, 1, 1, 9, 2, 4, 7];
    expect(
      xyUniqueX({ x, y }, { algorithm: 'average', isSorted: true }),
    ).toStrictEqual({
      x: [0, 1, 2, 4],
      y: [1, 9, 3, 7],
    });
  });

  it('sorted avg 2', function () {
    let x = [0, 0, 0, 0, 1, 2, 2, 4, 4];
    let y = [1, 1, 1, 1, 9, 2, 4, 7, 11];
    expect(
      xyUniqueX({ x, y }, { algorithm: 'average', isSorted: true }),
    ).toStrictEqual({
      x: [0, 1, 2, 4],
      y: [1, 9, 3, 9],
    });
  });
});
