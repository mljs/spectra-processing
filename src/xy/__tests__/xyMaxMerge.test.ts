import { xyMaxMerge } from '../../index';

const points = {
  x: [100.001, 100.002, 200.01, 200.02, 300.0001, 300.0002],
  y: [10, 11, 20, 21, 32, 31],
};
describe('xyMaxMerge', () => {
  it('default value', () => {
    const merged = xyMaxMerge(points);
    expect(merged.x).toBeDeepCloseTo([100.002, 200.01, 200.02, 300.0001], 4);
    expect(merged.y).toStrictEqual([21, 20, 21, 63]);
  });

  it('custom value', () => {
    const merged = xyMaxMerge(points, { groupWidth: 0.010001 });
    expect(merged.x).toBeDeepCloseTo([100.002, 200.02, 300.0001], 4);
    expect(merged.y).toStrictEqual([21, 41, 63]);
  });
});
