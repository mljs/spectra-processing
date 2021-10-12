import { xyMedian } from '../xyMedian.js';

describe('xyMedian', () => {
  it('check the median of four consecutive integers, should return 2.5', () => {
    const data = {
      x: [1, 2, 3, 4],
      y: [1, 1, 1, 1],
    };
    expect(xyMedian(data)).toBe(2.5);
  });
  it('check three points with occurrence 1:2:1, should return 2', () => {
    const data = {
      x: [1, 2, 3],
      y: [1, 2, 1],
    };
    expect(xyMedian(data)).toBe(2);
  });
  it('check two points with occurrence 3:1, should return 1', () => {
    const data = {
      x: [1, 2],
      y: [3, 1],
    };
    expect(xyMedian(data)).toBe(1);
  });
  it('median of four consecutive number with occurrence 1:2:1:2, should return 2.5', () => {
    const data = {
      x: [1, 2, 3, 4],
      y: [1, 2, 1, 2],
    };
    expect(xyMedian(data)).toBe(2.5);
  });
  it('check three consecutive numbers with occurrence 2:1:1, should return 1.5', () => {
    const data = {
      x: [1, 2, 3],
      y: [2, 1, 1],
    };
    expect(xyMedian(data)).toBe(1.5);
  });
  it('check one point, should return 1', () => {
    const data = {
      x: [1],
      y: [3],
    };
    expect(xyMedian(data)).toBe(1);
  });
  it('empty property x, should return NaN', () => {
    const data = {
      x: [],
      y: [],
    };
    expect(isNaN(xyMedian(data))).toBe(true);
  });
});
