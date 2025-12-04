import { expect, test } from 'vitest';

import { xyObjectMinMaxValues } from '../xyObjectMinMaxValues.ts';

test('one element', () => {
  expect(xyObjectMinMaxValues([{ x: 1, y: 2 }])).toStrictEqual({
    minX: 1,
    maxX: 1,
    minY: 2,
    maxY: 2,
  });
});

test('multiple elements', () => {
  expect(
    xyObjectMinMaxValues([
      { x: 1, y: 2 },
      { x: 5, y: 4 },
      { x: 3, y: 6 },
      { x: -2, y: -5 },
      { x: 0, y: 0 },
    ]),
  ).toStrictEqual({ minX: -2, maxX: 5, minY: -5, maxY: 6 });
});

test('throws error if array is empty', () => {
  expect(() => xyObjectMinMaxValues([])).toThrowError(
    'points must have a length of at least 1',
  );
});
