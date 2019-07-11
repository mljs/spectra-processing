import { xyMaxY } from '../xyMaxY.js';

describe('xyMaxY', function () {
  it('no from to', function () {
    let x = [0, 1, 2, 3];
    let y = [1, 2, 3, 1];
    expect(xyMaxY({ x, y })).toBe(3);
  });

  it('with from to', function () {
    let x = [0, 1, 2, 3];
    let y = [1, 2, 3, 1];
    expect(xyMaxY({ x, y }, { from: 0, to: 1 })).toBe(2);
  });
});
