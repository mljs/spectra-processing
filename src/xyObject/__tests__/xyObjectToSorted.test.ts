import { expect, expectTypeOf, test } from 'vitest';

import type { Point } from '../../types/index.ts';
import { RADIX_ORDER_MIN_LENGTH } from '../../x/utils/radixSortOrder.ts';
import { xyObjectToSorted } from '../xyObjectToSorted.ts';

test('returns a copy sorted by x without changing the input array', () => {
  const points = [
    { x: 3, y: 30 },
    { x: 1, y: 10 },
    { x: 2, y: 20 },
  ];

  expect(xyObjectToSorted(points)).toStrictEqual([
    points[1],
    points[2],
    points[0],
  ]);
  expect(points).toStrictEqual([
    { x: 3, y: 30 },
    { x: 1, y: 10 },
    { x: 2, y: 20 },
  ]);
});

test('keeps the type of the points', () => {
  interface Peak extends Point {
    label: string;
  }
  const peaks: readonly Peak[] = [{ x: 1, y: 2, label: 'peak' }];

  expectTypeOf(xyObjectToSorted(peaks)).toEqualTypeOf<Peak[]>();
});

test.each([RADIX_ORDER_MIN_LENGTH - 1, RADIX_ORDER_MIN_LENGTH, 1000])(
  'matches the stable comparator sort (%i points)',
  (length) => {
    const points = Array.from({ length }, (_, y) => ({ x: (y * 37) % 53, y }));
    const original = points.slice();

    expect(xyObjectToSorted(points)).toStrictEqual(
      points.toSorted((a, b) => a.x - b.x),
    );
    expect(points).toStrictEqual(original);
  },
);
