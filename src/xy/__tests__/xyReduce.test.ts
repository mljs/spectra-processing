import { xyReduce } from '../../index';

describe('xyReduce', () => {
  const x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const y = [0, 1, 2, 3, 4, 5, 4, 3, 2, 1, 0];
  it('All', () => {
    const expected = {
      x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      y: [0, 1, 2, 3, 4, 5, 4, 3, 2, 1, 0],
    };
    const result = xyReduce({ x, y }, { nbPoints: 20 });
    result.x = Array.from(result.x);
    result.y = Array.from(result.y);
    expect(result).toStrictEqual(expected);
  });

  it('Over sized', () => {
    const x2 = [1, 2];
    const y2 = [2, 3];
    const result = xyReduce({ x: x2, y: y2 }, { nbPoints: 10 });
    result.x = Array.from(result.x);
    result.y = Array.from(result.y);
    expect(result).toStrictEqual({
      x: [1, 2],
      y: [2, 3],
    });
  });

  it('Too large', () => {
    const result = {
      x: new Float64Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      y: new Float64Array([0, 1, 2, 3, 4, 5, 4, 3, 2, 1, 0]),
    };
    expect(
      xyReduce({ x, y }, { nbPoints: 20, from: -10, to: 20 }),
    ).toStrictEqual(result);
  });

  it('Part exact', () => {
    const result = {
      x: new Float64Array([3, 4, 5]),
      y: new Float64Array([3, 4, 5]),
    };
    expect(xyReduce({ x, y }, { from: 3, to: 5, nbPoints: 20 })).toStrictEqual(
      result,
    );
  });

  it('Part rounded close', () => {
    const result = {
      x: new Float64Array([3, 4, 5]),
      y: new Float64Array([3, 4, 5]),
    };
    expect(
      xyReduce({ x, y }, { from: 3.1, to: 4.9, nbPoints: 20 }),
    ).toStrictEqual(result);
  });

  it('Part rounded far', () => {
    const result = {
      x: new Float64Array([3, 4, 5]),
      y: new Float64Array([3, 4, 5]),
    };
    expect(
      xyReduce({ x, y }, { from: 3.6, to: 4.4, nbPoints: 20 }),
    ).toStrictEqual(result);
  });

  it('Part rounded far 2', () => {
    const result = xyReduce({ x, y }, { nbPoints: 5 });

    expect(result).toStrictEqual({
      x: [0, 2.5, 5, 7.5, 10],
      y: [0, 1, 5, 0, 4],
    });
  });

  it('Part rounded big data', () => {
    const x2 = [];
    const y2 = [];
    for (let i = 0; i < 5000000; i++) {
      x2.push(i);
      y2.push(i);
    }
    const result = xyReduce({ x: x2, y: y2 }, { nbPoints: 4000 });
    expect(result.x).toHaveLength(4001);
    expect(result.y).toHaveLength(4001);
  });

  it('Part rounded big data 2', () => {
    const x2 = [];
    const y2 = [];
    for (let i = 0; i < 5000000; i++) {
      x2.push(i);
      y2.push(i);
    }
    const result = xyReduce(
      { x: x2, y: y2 },
      { nbPoints: 4000, from: 10, to: 20 },
    );
    expect(Array.from(result.x)).toStrictEqual([
      10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    ]);
    expect(Array.from(result.y)).toStrictEqual([
      10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    ]);
  });

  it('xyCheck optimization', () => {
    const x2 = [];
    const y2 = [];
    for (let i = 0; i < 11; i++) {
      x2.push(i);
      y2.push(i);
    }
    const result = xyReduce({ x: x2, y: y2 }, { nbPoints: 5, optimize: true });
    expect(result.x).toStrictEqual([0, 5, 10]);
    expect(result.y).toStrictEqual([0, 5, 10]);
  });

  it('Part rounded far 2 with optimization', () => {
    const result = xyReduce({ x, y }, { nbPoints: 5, optimize: true });

    expect(result).toStrictEqual({
      x: [0, 5, 10],
      y: [0, 5, 0],
    });
  });

  it('xyReduce with zones enough points', () => {
    const result = xyReduce(
      { x, y },
      {
        nbPoints: 5,
        zones: [
          { from: 0, to: 1 },
          { from: 5, to: 7 },
        ],
      },
    );

    expect(result).toStrictEqual({
      x: new Float64Array([0, 1, 5, 6, 7]),
      y: new Float64Array([0, 1, 5, 4, 3]),
    });
  });

  it('xyReduce with zones not enough points edge cases', () => {
    const result = xyReduce(
      { x, y },
      {
        nbPoints: 3,
        zones: [
          { from: 0, to: 1 },
          { from: 5, to: 8 },
        ],
      },
    );

    expect(result).toStrictEqual({
      x: [1, 5, 8],
      y: [1, 5, 2],
    });
  });

  it('xyReduce with zones not enough points', () => {
    const result = xyReduce(
      { x, y },
      {
        nbPoints: 4,
        zones: [
          { from: 0, to: 1 },
          { from: 5, to: 8 },
        ],
      },
    );
    expect(result).toStrictEqual({
      x: [1, 5, 6.5, 8],
      y: [1, 5, 2, 4],
    });
  });

  it('xyReduce with one zone not enough points', () => {
    const result = xyReduce(
      { x, y },
      {
        nbPoints: 4,
        zones: [
          { from: -1, to: -1 },
          { from: 3, to: 8 },
        ],
      },
    );
    expect(result).toStrictEqual({
      x: [3, 4.25, 5.5, 6.75, 8], // could be fixed with only 4 points
      y: [3, 4, 5, 2, 3],
    });
  });

  it('Large data with zones', () => {
    const x2 = [];
    const y2 = [];
    for (let i = 0; i < 5000001; i++) {
      x2.push(i);
      y2.push(i);
    }
    const result = xyReduce(
      { x: x2, y: y2 },
      {
        nbPoints: 6,
        zones: [
          { from: 0, to: 1000 },
          { from: 1000000, to: 1001000 },
        ],
      },
    );
    expect(result).toStrictEqual({
      x: [0, 500, 1000, 1000000, 1000500, 1001000],
      y: [0, 1, 1000, 1000000, 1000001, 1001000],
    });
  });
});
