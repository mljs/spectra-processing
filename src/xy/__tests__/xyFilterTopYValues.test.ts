import { xyFilterTopYValues } from '../../index';

describe('xyFilterTopYValues', () => {
  const x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const y = [10, 8, 6, 4, 2, 10, 2, 4, 6, 8, 10];
  it('no limits', () => {
    const results = xyFilterTopYValues({ x, y });
    expect(results).toStrictEqual({ x, y });
    expect(results.x).toBe(x);
    expect(results.y).toBe(y);
  });
  it('some limit with duplicates', () => {
    expect(xyFilterTopYValues({ x, y }, 0)).toStrictEqual({
      x: [],
      y: [],
    });
    expect(xyFilterTopYValues({ x, y }, 1)).toStrictEqual({
      x: [0],
      y: [10],
    });
    expect(xyFilterTopYValues({ x, y }, 2)).toStrictEqual({
      x: [0, 5],
      y: [10, 10],
    });
    expect(xyFilterTopYValues({ x, y }, 3)).toStrictEqual({
      x: [0, 5, 10],
      y: [10, 10, 10],
    });
    expect(xyFilterTopYValues({ x, y }, 4)).toStrictEqual({
      x: [0, 1, 5, 10],
      y: [10, 8, 10, 10],
    });
  });
});
