import { xyFilter } from '../../index';

describe('xyFilter', () => {
  const x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const y = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const points = { x, y };

  it('no filter', () => {
    const result = xyFilter(points);
    expect(result).toStrictEqual({
      x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      y: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    });
  });

  it('x filter', () => {
    const result = xyFilter(points, {
      filter: (xValue) => xValue <= 2 || xValue >= 5,
    });
    expect(result).toStrictEqual({
      x: [0, 1, 2, 5, 6, 7, 8, 9, 10],
      y: [1, 2, 3, 6, 7, 8, 9, 10, 11],
    });
  });

  it('y filter', () => {
    const result = xyFilter(points, {
      filter: (xValue, yValue) => yValue <= 2 || yValue >= 5,
    });
    expect(result).toStrictEqual({
      x: [0, 1, 4, 5, 6, 7, 8, 9, 10],
      y: [1, 2, 5, 6, 7, 8, 9, 10, 11],
    });
  });
});
