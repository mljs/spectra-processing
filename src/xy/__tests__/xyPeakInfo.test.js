import { xyPeakInfo } from '../xyPeakInfo.js';

describe('xyPeakInfo', function () {
  it('positive peak', function () {
    let x = [0, 1, 2, 3, 4, 5, 6];
    let y = [1, 2, 3, 5, 3, 2, 1];
    let result = xyPeakInfo({ x, y }, { targetIndex: 3 });

    expect(result).toStrictEqual({
      inflectionBefore: { x: 2, y: 3 },
      inflectionAfter: { x: 4, y: 3 },
      extrema: { x: 3, y: 5 },
      inflectionMiddle: { x: 3, y: 3 },
      width: 2,
    });
  });
  it('negative peak', function () {
    let x = [0, 1, 2, 3, 4, 5, 6];
    let y = [-1, -2, -3, -5, -3, -2, -1];
    let result = xyPeakInfo({ x, y }, { targetIndex: 3 });
    expect(result).toStrictEqual({
      inflectionBefore: { x: 2, y: -3 },
      inflectionAfter: { x: 4, y: -3 },
      extrema: { x: 3, y: -5 },
      inflectionMiddle: { x: 3, y: -3 },
      width: 2,
    });
  });
});
