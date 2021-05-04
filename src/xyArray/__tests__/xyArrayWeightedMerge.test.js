import { toMatchCloseTo } from 'jest-matcher-deep-close-to';

import { xyArrayWeightedMerge } from '../xyArrayWeightedMerge.js';

expect.extend({ toMatchCloseTo });

describe('xyArrayWeightedMerge', function () {
  it('2 slots', () => {
    let data = [
      { x: [100, 202, 300], y: [10, 30, 20] },
      { x: [101, 201, 400], y: [30, 10, 40] },
    ];
    let result = xyArrayWeightedMerge(data, { delta: 2 });

    expect(result).toStrictEqual({
      x: [100.75, 201.75, 300, 400],
      y: [40, 40, 20, 40],
    });
  });

  it('simple no merge', () => {
    let data = [
      { x: [10, 20], y: [1, 2] },
      { x: [60, 70], y: [6, 7] },
      { x: [30, 40], y: [3, 4] },
      { x: [50, 80], y: [5, 8] },
    ];
    let result = xyArrayWeightedMerge(data, { delta: 2 });
    expect(result).toStrictEqual({
      x: [10, 20, 30, 40, 50, 60, 70, 80],
      y: [1, 2, 3, 4, 5, 6, 7, 8],
    });
  });

  it('simple full merge', () => {
    let data = [
      { x: [1, 2], y: [1, 2] },
      { x: [6, 7], y: [6, 7] },
      { x: [3, 4], y: [3, 4] },
      { x: [5, 8], y: [5, 8] },
    ];
    let result = xyArrayWeightedMerge(data);
    expect(result).toMatchCloseTo({ x: [5.666666666666667], y: [36] });
  });

  it('check dense weighted average for x', () => {
    let data = [
      { x: [100, 101, 102, 200, 201, 202], y: [10, 20, 30, 40, 50, 60] },
      { x: [101, 102, 103, 300], y: [30, 10, 40, 50] },
    ];
    let result = xyArrayWeightedMerge(data, { delta: 2 });

    expect(result).toMatchCloseTo({
      x: [101.78571428571429, 201.13333333333333, 300],
      y: [140, 150, 50],
    });
  });

  it('empty data', () => {
    let data = [];
    let result = xyArrayWeightedMerge(data, { delta: 2 });
    expect(result).toMatchCloseTo({ x: [], y: [] });
  });

  it('large Data Set', () => {
    let data = [];
    let arraySize = 1e5;
    for (let dataset = 0; dataset < 20; dataset++) {
      let datum = {
        x: new Float64Array(arraySize),
        y: new Float64Array(arraySize),
      };
      data.push(datum);
      for (let i = 0; i < arraySize; i++) {
        datum.x[i] = Math.round(Math.random() * 100) * 10 + Math.random();
        datum.y[i] = Math.random();
      }
      datum.x.sort();
      datum.y.sort();
    }
    const start = Date.now();
    let result = xyArrayWeightedMerge(data, { delta: 2 });
    expect(result.x).toHaveLength(101);
    expect(result.y).toHaveLength(101);
    const elapsed = Date.now() - start;
    expect(elapsed).toBeLessThanOrEqual(5000);
  });
});
