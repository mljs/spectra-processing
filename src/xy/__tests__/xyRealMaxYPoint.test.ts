import { xyRealMaxYPoint } from '../../index';

describe('xyRealMaxYPoint', () => {
  it('positive symmetric peak', () => {
    let xy = {
      x: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9],
      y: [1, 2, 3, 4, 5, 4, 3, 2, 1],
    };

    expect(
      xyRealMaxYPoint(xy, {
        target: 0.5,
      }),
    ).toStrictEqual({
      x: 0.5,
      y: 5,
      index: 4,
    });
  });

  it('positive asymmetric peak', () => {
    let xy = {
      x: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9],
      y: [1, 2, 3, 4, 5, 5, 4, 3, 2],
    };

    expect(
      xyRealMaxYPoint(xy, {
        targetIndex: 4,
      }),
    ).toStrictEqual({
      x: 0.55,
      y: 5.125,
      index: 4,
    });
  });
});
