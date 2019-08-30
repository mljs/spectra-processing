import { maxClosestYPoint } from '../maxClosestYPoint';

describe('maxClosestYPoint', () => {
  it('positive peak', () => {
    let points = {
      x: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9],
      y: [1, 2, 3, 4, 5, 4, 3, 2, 1],
    };

    expect(maxClosestYPoint(points, { target: 5 })).toStrictEqual({
      x: 0.5,
      y: 5,
      index: 4,
    });

    expect(maxClosestYPoint(points, { target: 1 })).toStrictEqual({
      x: 0.5,
      y: 5,
      index: 4,
    });

    expect(maxClosestYPoint(points, { target: -5 })).toStrictEqual({
      x: 0.5,
      y: 5,
      index: 4,
    });

    expect(maxClosestYPoint(points, { targetIndex: 0 })).toStrictEqual({
      x: 0.5,
      y: 5,
      index: 4,
    });
  });
});
