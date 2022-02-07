import { xyMergeByCentroids } from '../xyMergeByCentroids';

const originalPoints = {
  x: [0.01, 1.008, 1.01, 1.012, 1.02, 1.04],
  y: [1, 1, 1, 1, 1, 1],
};

describe('xyMergeByCentroids', () => {
  it('base case', () => {
    expect(xyMergeByCentroids(originalPoints, [1.01, 1.04])).toStrictEqual({
      x: [1.01, 1.04],
      y: new Float64Array([3, 1]),
    });
  });

  it('specify options', () => {
    expect(
      xyMergeByCentroids(originalPoints, [1, 1.03], { window: 0.013 }),
    ).toStrictEqual({
      x: [1, 1.03],
      y: new Float64Array([3, 2]),
    });
  });
});
