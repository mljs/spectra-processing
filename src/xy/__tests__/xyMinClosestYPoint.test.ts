import { xyMinClosestYPoint } from '../xyMinClosestYPoint';

describe('xyMinClosestYPoint', () => {
  it('negative peak', () => {
    let xy = {
      x: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9],
      y: [1, 2, 3, 4, 5, 4, 3, 2, 1],
    };

    expect(xyMinClosestYPoint(xy, { target: 5 })).toStrictEqual({
      x: 0.9,
      y: 1,
      index: 8,
    });

    expect(xyMinClosestYPoint(xy, { target: 0.4 })).toStrictEqual({
      x: 0.1,
      y: 1,
      index: 0,
    });

    expect(xyMinClosestYPoint(xy, { target: -5 })).toStrictEqual({
      x: 0.1,
      y: 1,
      index: 0,
    });

    expect(xyMinClosestYPoint(xy, { targetIndex: 3 })).toStrictEqual({
      x: 0.1,
      y: 1,
      index: 0,
    });
  });
});
