import { xyCovariance } from '../../index';

describe('covariance', () => {
  it('should yield the correct result', () => {
    const x = [1, 2, 3, 4, 5, 6];
    const y = [1, 4, 2, 5, 3, 6];
    expect(xyCovariance({ x, y })).toBe(2.5);
  });
});
