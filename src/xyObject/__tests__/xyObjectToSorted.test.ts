import { expect, test } from 'vitest';

import { xyObjectToSorted } from '../xyObjectToSorted.ts';

test('sorts by x by default without changing the input array', () => {
  const points = [
    { x: 3, y: 30 },
    { x: 1, y: 10 },
    { x: 2, y: 20 },
  ];
  const original = points.slice();

  const sorted = xyObjectToSorted(points);

  expect(sorted).toStrictEqual([original[1], original[2], original[0]]);
  expect(sorted).not.toBe(points);
  expect(points).toStrictEqual(original);
});

test('sorts by the selected numeric key', () => {
  const points = [
    { x: 1, y: 30 },
    { x: 2, y: 10 },
    { x: 3, y: 20 },
  ];

  expect(xyObjectToSorted(points, 'y')).toStrictEqual([
    points[1],
    points[2],
    points[0],
  ]);
  expect(points).toStrictEqual([
    { x: 1, y: 30 },
    { x: 2, y: 10 },
    { x: 3, y: 20 },
  ]);
});

test('uses the same ordering for long arrays without reordering the input', () => {
  const points = Array.from({ length: 1000 }, (_, index) => ({
    x: index,
    intensity: (index * 37) % 53,
  }));
  const original = points.slice();
  const expected = points.toSorted((a, b) => a.intensity - b.intensity);

  const sorted = xyObjectToSorted(points, 'intensity');

  expect(sorted).toStrictEqual(expected);
  expect(sorted).not.toBe(points);
  expect(points).toStrictEqual(original);
});
