import { maxYPoint } from '../maxYPoint.js';

describe('maxYPoint', function() {
  it('no from to', function() {
    let x = [0, 1, 2, 3];
    let y = [1, 2, 3, 1];
    expect(maxYPoint({ x, y })).toStrictEqual({ x: 2, y: 3, index: 2 });
  });

  it('with from to', function() {
    let x = [0, 1, 2, 3];
    let y = [1, 2, 3, 1];
    expect(maxYPoint({ x, y }, { from: 0, to: 1 })).toStrictEqual({
      index: 1,
      x: 1,
      y: 2,
    });
  });
});
