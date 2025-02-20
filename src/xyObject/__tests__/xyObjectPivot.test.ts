import { test, expect } from 'vitest';

import { xyObjectPivot } from '../xyObjectPivot';

const points = [
  { x: 1, y: 1 },
  { x: 2, y: 3 },
  { x: 3, y: 7 },
  { x: 4, y: 6 },
  { x: 5, y: 2 },
];

test('should return null for an empty array', () => {
  expect(xyObjectPivot([])).toStrictEqual(null);
});

test('should return the index of the peak within the default range', () => {
  expect(xyObjectPivot(points)).toStrictEqual({ x: 5, y: 2 });
});

test('should return the index of the peak within a specified range', () => {
  expect(xyObjectPivot(points, { from: 2, to: 4 })).toStrictEqual({
    x: 2,
    y: 3,
  });
});

test('should return 4 because there is a exact match', () => {
  expect(xyObjectPivot(points, { from: 4.5, to: 5 })).toStrictEqual({
    x: 5,
    y: 2,
  });
});

test('should return 4 even if from is greater than to', () => {
  expect(xyObjectPivot(points, { from: 5, to: 1 })).toStrictEqual({
    x: 5,
    y: 2,
  });
});

test('should return the index of the peak with a custom threshold factor', () => {
  expect(xyObjectPivot(points, { thresholdFactor: 0.5 })).toStrictEqual({
    x: 4,
    y: 6,
  });
});

test('should return -1 if no peak meets the threshold', () => {
  expect(xyObjectPivot(points, { thresholdFactor: 1 })).toStrictEqual({
    x: 3,
    y: 7,
  });
});
