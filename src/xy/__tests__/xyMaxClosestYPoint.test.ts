import { xyMaxClosestYPoint } from '../../index';

describe('xyMaxClosestYPoint', () => {
  it('positive peak', () => {
    const xy = {
      x: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9],
      y: [1, 2, 3, 4, 5, 4, 3, 2, 1],
    };

    expect(xyMaxClosestYPoint(xy, { target: 5 })).toStrictEqual({
      x: 0.5,
      y: 5,
      index: 4,
    });

    expect(xyMaxClosestYPoint(xy, { target: 1 })).toStrictEqual({
      x: 0.5,
      y: 5,
      index: 4,
    });

    expect(xyMaxClosestYPoint(xy, { target: -5 })).toStrictEqual({
      x: 0.5,
      y: 5,
      index: 4,
    });

    expect(xyMaxClosestYPoint(xy, { targetIndex: 0 })).toStrictEqual({
      x: 0.5,
      y: 5,
      index: 4,
    });
  });
});
