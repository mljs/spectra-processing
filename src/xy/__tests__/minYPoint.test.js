import { minYPoint } from '../minYPoint.js';

describe('minYPoint', function () {
  it('no from to', function () {
    let x = [0, 1, 2, 3];
    let y = [1, 2, 3, 1];
    expect(minYPoint({ x, y })).toStrictEqual({ x: 0, y: 1, index: 0 });
  });

  it('with from to', function () {
    let x = [0, 1, 2, 3];
    let y = [2, 2, 1, 3];
    expect(minYPoint({ x, y }, { from: 0, to: 2 })).toStrictEqual({
      x: 2,
      y: 1,
      index: 2,
    });
  });

  it('with from to inverted', function () {
    let x = [0, 1, 2, 3];
    let y = [2, 2, 1, 3];
    expect(minYPoint({ x, y }, { from: 3, to: 0 })).toStrictEqual({
      x: 2,
      y: 1,
      index: 2,
    });
  });
});
