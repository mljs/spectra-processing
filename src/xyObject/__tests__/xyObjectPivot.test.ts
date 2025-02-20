import { test, expect } from 'vitest';

import { xyObjectPivot } from '../xyObjectPivot';

const points = [
  { x: 1, y: 1 },
  { x: 2, y: 3 },
  { x: 3, y: 7 },
  { x: 4, y: 6 },
  { x: 5, y: 2 },
];

test('should return -1 for an empty array', () => {
  expect(xyObjectPivot([])).toBe(-1);
});

test('should return the index of the peak within the default range', () => {
  expect(xyObjectPivot(points)).toBe(4);
});

test('should return the index of the peak within a specified range', () => {
  expect(xyObjectPivot(points, { fromTo: { from: 2, to: 4 } })).toBe(1);
});

test('should return 4 because there is a exact match', () => {
  expect(xyObjectPivot(points, { fromTo: { from: 4.5, to: 5 } })).toBe(4);
});

test('should return 4 even if from is greater than to', () => {
  expect(xyObjectPivot(points, { fromTo: { from: 5, to: 1 } })).toBe(4);
});

test('should return the index of the peak with a custom threshold factor', () => {
  expect(xyObjectPivot(points, { thresholdFactor: 0.5 })).toBe(3);
});

test('should return -1 if no peak meets the threshold', () => {
  expect(xyObjectPivot(points, { thresholdFactor: 1 })).toBe(2);
});
