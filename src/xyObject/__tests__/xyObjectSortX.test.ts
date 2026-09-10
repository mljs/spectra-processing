import { XSadd } from 'ml-xsadd';
import { expect, test } from 'vitest';

import { xyObjectSortX } from '../xyObjectSortX.ts';

test('xyObjectSortX', () => {
  const arrayXY = [
    { x: 1, y: 1 },
    { x: 3, y: 3 },
    { x: 2, y: 2 },
    { x: 0, y: 0 },
  ];

  expect(xyObjectSortX(arrayXY)).toStrictEqual([
    { x: 0, y: 0 },
    { x: 1, y: 1 },
    { x: 2, y: 2 },
    { x: 3, y: 3 },
  ]);
});

// The short array above is ordered by a comparator, the long one by xGetSortOrder: both have
// to give the same stable order, and both in place.
test('same stable order whatever the length', () => {
  for (const length of [100, 1000]) {
    const { random } = new XSadd(42);
    const points = Array.from({ length }, (value, index) => ({
      x: Math.round(random() * 20),
      y: index,
    }));
    const expected = points.toSorted((a, b) => a.x - b.x);

    const result = xyObjectSortX(points);

    expect(result).toBe(points);
    expect(result).toStrictEqual(expected);
  }
});
