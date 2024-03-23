import { expect, test } from 'vitest';

import { xyObjectBestPoints } from '../xyObjectBestPoints';

const points = [
  { x: 1, y: 1 },
  { x: 2, y: 4 },
  { x: 3, y: 2 },
  { x: 4, y: 5 },
  { x: 5, y: 3 },
];

test('default options', () => {
  const result = xyObjectBestPoints(points);
  expect(result).toStrictEqual([
    { x: 1, y: 1, close: false },
    { x: 2, y: 4, close: false },
    { x: 3, y: 2, close: false },
    { x: 4, y: 5, close: false },
    { x: 5, y: 3, close: false },
  ]);
});

test('custom options', () => {
  const result = xyObjectBestPoints(points, {
    numberSlots: 3,
    numberCloseSlots: 6,
  });
  expect(result).toStrictEqual([
    { close: true, x: 1, y: 1 },
    { close: false, x: 2, y: 4 },
    { close: true, x: 3, y: 2 },
    { close: false, x: 4, y: 5 },
    { close: true, x: 5, y: 3 },
  ]);
});

test('custom options threshold', () => {
  const result = xyObjectBestPoints(points, { threshold: 0.5 });
  expect(result).toStrictEqual([
    { close: false, x: 2, y: 4 },
    { close: false, x: 4, y: 5 },
    { close: false, x: 5, y: 3 },
  ]);
});
