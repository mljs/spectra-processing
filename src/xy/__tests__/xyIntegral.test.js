import { xyIntegral } from '../xyIntegral.js';

describe('xyIntegral', function () {
  it('no from to', function () {
    let x = [0, 1, 2, 3];
    let y = [1, 1, 1, 1];
    let result = xyIntegral({ x, y });
    expect(result).toStrictEqual({ x: [0, 1, 2, 3], y: [0, 1, 2, 3] });
  });

  it('no from to with integral', function () {
    let x = [0, 1, 2, 3];
    let y = [1, 1, 1, 1];
    let result = xyIntegral({ x, y }, { from: 1, to: 2 });
    expect(result).toStrictEqual({ x: [1, 2], y: [0, 1] });
  });

  it('no from to with integral too large', function () {
    let x = [1, 2, 3, 4];
    let y = [10, 20, 30, 40];
    let result = xyIntegral({ x, y }, { from: 2, to: 6 });
    expect(result).toStrictEqual({ x: [2, 3, 4], y: [0, 25, 60] });
  });
});
