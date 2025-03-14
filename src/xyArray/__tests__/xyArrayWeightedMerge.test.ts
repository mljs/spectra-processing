import type { DataXY } from 'cheminfo-types';
import { XSadd } from 'ml-xsadd';
import { expect, test } from 'vitest';

import { xyArrayWeightedMerge } from '../xyArrayWeightedMerge';

test('2 slots', () => {
  const data = [
    { x: [100, 202, 300], y: [10, 30, 20] },
    { x: [101, 201, 400], y: [30, 10, 40] },
  ];
  const result = xyArrayWeightedMerge(data, { delta: 2 });

  expect(result).toStrictEqual({
    x: [100.75, 201.75, 300, 400],
    y: [40, 40, 20, 40],
  });
});

test('simple no merge', () => {
  const data = [
    { x: [10, 20], y: [1, 2] },
    { x: [60, 70], y: [6, 7] },
    { x: [30, 40], y: [3, 4] },
    { x: [50, 80], y: [5, 8] },
  ];
  const result = xyArrayWeightedMerge(data, { delta: 2 });
  expect(result).toStrictEqual({
    x: [10, 20, 30, 40, 50, 60, 70, 80],
    y: [1, 2, 3, 4, 5, 6, 7, 8],
  });
});

test('simple full merge', () => {
  const data = [
    { x: [1, 2], y: [1, 2] },
    { x: [6, 7], y: [6, 7] },
    { x: [3, 4], y: [3, 4] },
    { x: [5, 8], y: [5, 8] },
  ];
  const result = xyArrayWeightedMerge(data);
  expect(result).toMatchCloseTo({ x: [5.666666666666667], y: [36] });
});

test('check dense weighted average for x', () => {
  const data = [
    { x: [100, 101, 102, 200, 201, 202], y: [10, 20, 30, 40, 50, 60] },
    { x: [101, 102, 103, 300], y: [30, 10, 40, 50] },
  ];
  const result = xyArrayWeightedMerge(data, { delta: 2 });

  expect(result).toMatchCloseTo({
    x: [101.78571428571429, 201.13333333333333, 300],
    y: [140, 150, 50],
  });
});

test('large slot', () => {
  const data = [
    { x: [100, 101, 102, 200, 201, 202], y: [10, 20, 30, 40, 50, 60] },
    { x: [101, 102, 103, 300], y: [30, 10, 40, 50] },
  ];
  const result = xyArrayWeightedMerge(data, { delta: 100 });
  expect(result).toMatchCloseTo({ x: [174.76470588235293], y: [340] });
});

test('function merge', () => {
  const data = [
    { x: [100, 101, 102, 200, 201, 202], y: [10, 20, 30, 40, 50, 60] },
    { x: [101, 102, 103, 300], y: [30, 10, 40, 50] },
  ];
  const result = xyArrayWeightedMerge(data, { delta: (x) => x * x });
  expect(result).toMatchCloseTo({ x: [174.76470588235293], y: [340] });
});

test('empty data', () => {
  const data: DataXY[] = [];
  const result = xyArrayWeightedMerge(data, { delta: 2 });
  expect(result).toMatchCloseTo({ x: [], y: [] });
});

test('large Data Set', () => {
  const data = [];
  const arraySize = 1e5;
  const generator = new XSadd(0);
  for (let dataset = 0; dataset < 20; dataset++) {
    const datum = {
      x: new Float64Array(arraySize),
      y: new Float64Array(arraySize),
    };
    data.push(datum);
    for (let i = 0; i < arraySize; i++) {
      datum.x[i] =
        Math.round(generator.random() * 100) * 10 + generator.random();
      datum.y[i] = generator.random();
    }
    datum.x.sort();
    datum.y.sort();
  }
  const start = Date.now();
  const result = xyArrayWeightedMerge(data, { delta: 2 });
  expect(result.x).toHaveLength(101);
  expect(result.y).toHaveLength(101);
  const elapsed = Date.now() - start;
  expect(elapsed).toBeLessThanOrEqual(5000);
});
