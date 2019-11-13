import { reduce } from '../reduce';

describe('test reduce', () => {
  const x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const y = [0, 1, 2, 3, 4, 5, 4, 3, 2, 1, 0];
  it('All', () => {
    let result = {
      x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      y: [0, 1, 2, 3, 4, 5, 4, 3, 2, 1, 0],
    };
    expect(reduce(x, y, { nbPoints: 20 })).toStrictEqual(result);
  });

  it('Over sized', () => {
    let x2 = [1, 2];
    let y2 = [2, 3];
    expect(reduce(x2, y2, { nbPoints: 10 })).toStrictEqual({
      x: [1, 2],
      y: [2, 3],
    });
  });

  it('Too large', () => {
    let result = {
      x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      y: [0, 1, 2, 3, 4, 5, 4, 3, 2, 1, 0],
    };
    expect(reduce(x, y, { nbPoints: 20, from: -10, to: 20 })).toStrictEqual(
      result,
    );
  });

  it('Part exact', () => {
    let result = {
      x: [3, 4, 5],
      y: [3, 4, 5],
    };
    expect(reduce(x, y, { from: 3, to: 5, nbPoints: 20 })).toStrictEqual(
      result,
    );
  });

  it('Part rounded close', () => {
    let result = {
      x: [3, 4, 5],
      y: [3, 4, 5],
    };
    expect(reduce(x, y, { from: 3.1, to: 4.9, nbPoints: 20 })).toStrictEqual(
      result,
    );
  });

  it('Part rounded far', () => {
    let result = {
      x: [3, 4, 5],
      y: [3, 4, 5],
    };
    expect(reduce(x, y, { from: 3.6, to: 4.4, nbPoints: 20 })).toStrictEqual(
      result,
    );
  });

  it('Part rounded far 2', () => {
    let result = reduce(x, y, { nbPoints: 5 });

    expect(result).toStrictEqual({
      x: [0, 2.5, 5, 7.5, 10],
      y: [0, 1, 5, 0, 4],
    });
  });

  it('Part rounded big data', () => {
    let x = [];
    let y = [];
    for (let i = 0; i < 5000000; i++) {
      x.push(i);
      y.push(i);
    }
    let result = reduce(x, y, { nbPoints: 4000 });
    expect(result.x).toHaveLength(4001);
    expect(result.y).toHaveLength(4001);
  });

  it('Part rounded big data 2', () => {
    let x = [];
    let y = [];
    for (let i = 0; i < 5000000; i++) {
      x.push(i);
      y.push(i);
    }
    let result = reduce(x, y, { nbPoints: 4000, from: 10, to: 20 });
    expect(result.x).toStrictEqual([
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
    ]);
    expect(result.y).toStrictEqual([
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
    ]);
  });
});
