import { xyUniqueX } from '../../index';

describe('xyUniqueX', () => {
  it('unsorted sum', () => {
    const x = [0, 0, 0, 2, 4, 0, 1, 2];
    const y = [1, 1, 1, 2, 7, 1, 9, 4];
    expect(
      xyUniqueX({ x, y }, { algorithm: 'sum', isSorted: false }),
    ).toStrictEqual({
      x: [0, 1, 2, 4],
      y: [4, 9, 6, 7],
    });
  });

  it('unsorted avg', () => {
    const x = [0, 0, 0, 2, 4, 0, 1, 2];
    const y = [1, 1, 1, 2, 7, 1, 9, 4];
    expect(
      xyUniqueX({ x, y }, { algorithm: 'average', isSorted: false }),
    ).toStrictEqual({ x: [0, 1, 2, 4], y: [1, 9, 3, 7] });
  });

  it('sorted sum', () => {
    const x = [0, 0, 0, 0, 1, 2, 2, 4];
    const y = [1, 1, 1, 1, 9, 2, 4, 7];
    expect(
      xyUniqueX({ x, y }, { algorithm: 'sum', isSorted: true }),
    ).toStrictEqual({
      x: [0, 1, 2, 4],
      y: [4, 9, 6, 7],
    });
  });

  it('sorted sum 2', () => {
    const x = [0, 0, 0, 0, 1, 2, 2, 4, 4];
    const y = [1, 1, 1, 1, 9, 2, 4, 7, 3];
    expect(
      xyUniqueX({ x, y }, { algorithm: 'sum', isSorted: true }),
    ).toStrictEqual({
      x: [0, 1, 2, 4],
      y: [4, 9, 6, 10],
    });
  });

  it('sorted avg', () => {
    const x = [0, 0, 0, 0, 1, 2, 2, 4];
    const y = [1, 1, 1, 1, 9, 2, 4, 7];
    expect(
      xyUniqueX({ x, y }, { algorithm: 'average', isSorted: true }),
    ).toStrictEqual({
      x: [0, 1, 2, 4],
      y: [1, 9, 3, 7],
    });
  });

  it('sorted avg 2', () => {
    const x = [0, 0, 0, 0, 1, 2, 2, 4, 4];
    const y = [1, 1, 1, 1, 9, 2, 4, 7, 11];
    expect(
      xyUniqueX({ x, y }, { algorithm: 'average', isSorted: true }),
    ).toStrictEqual({
      x: [0, 1, 2, 4],
      y: [1, 9, 3, 9],
    });
  });
});
