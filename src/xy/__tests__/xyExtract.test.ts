import { xyExtract } from '../../index';

describe('xyExtract', () => {
  const x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const y = [0, 1, 2, 3, 4, 5, 4, 3, 2, 1, 0];

  it('All', () => {
    const expected = {
      x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      y: [0, 1, 2, 3, 4, 5, 4, 3, 2, 1, 0],
    };
    const result = xyExtract({ x, y });
    result.x = Array.from(result.x);
    result.y = Array.from(result.y);
    expect(result).toStrictEqual(expected);
  });

  it('one zone', () => {
    const expected = {
      x: [0, 1, 2],
      y: [0, 1, 2],
    };
    const result = xyExtract({ x, y }, { zones: [{ from: -1, to: 2 }] });
    result.x = Array.from(result.x);
    result.y = Array.from(result.y);
    expect(result).toStrictEqual(expected);
  });

  it('two zones', () => {
    const expected = {
      x: [0, 1, 2, 5, 6, 7],
      y: [0, 1, 2, 5, 4, 3],
    };
    const result = xyExtract(
      { x, y },
      {
        zones: [
          { from: -1, to: 2 },
          { from: 5, to: 7 },
        ],
      },
    );
    result.x = Array.from(result.x);
    result.y = Array.from(result.y);
    expect(result).toStrictEqual(expected);
  });

  it('three zones', () => {
    const expected = {
      x: [2, 3, 4, 5, 6, 7, 9, 10],
      y: [2, 3, 4, 5, 4, 3, 1, 0],
    };
    const result = xyExtract(
      { x, y },
      {
        zones: [
          { from: 2, to: 4 },
          { from: 5, to: 7 },
          { from: 9, to: 20 },
        ],
      },
    );
    result.x = Array.from(result.x);
    result.y = Array.from(result.y);
    expect(result).toStrictEqual(expected);
  });
});
