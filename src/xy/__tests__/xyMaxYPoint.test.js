import { xyMaxYPoint } from '../xyMaxYPoint.js';

describe('xyMaxYPoint', function () {
  it('no from to', function () {
    let x = [0, 1, 2, 3];
    let y = [1, 2, 3, 1];
    expect(xyMaxYPoint({ x, y })).toStrictEqual({ x: 2, y: 3, index: 2 });
  });

  it('with from to', function () {
    let x = [0, 1, 2, 3];
    let y = [1, 2, 3, 1];
    expect(xyMaxYPoint({ x, y }, { from: 0, to: 1 })).toStrictEqual({
      index: 1,
      x: 1,
      y: 2,
    });
  });
});
