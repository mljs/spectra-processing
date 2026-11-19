import { expect, expectTypeOf, test } from 'vitest';

import { xyObjectToSorted } from '../xyObjectToSorted.ts';

test('sorts objects without x when an explicit numeric key is supplied', () => {
  const points = [{ y: 3 }, { y: 1 }, { y: 2 }];

  expect(xyObjectToSorted(points, 'y')).toStrictEqual([
    points[1],
    points[2],
    points[0],
  ]);

  expectTypeOf(xyObjectToSorted(points, 'y')).toEqualTypeOf<
    Array<{ y: number }>
  >();
});

test('requires a numeric key on every point', () => {
  interface Point {
    x: number;
    y: number;
    label: string;
    intensity?: number;
  }
  type MixedPoint = Point | { x: number; y: string; label: string };
  const points: readonly Point[] = [{ x: 1, y: 2, label: 'peak' }];

  expectTypeOf(xyObjectToSorted<Point>)
    .parameter(1)
    .toEqualTypeOf<'x' | 'y' | undefined>();
  expectTypeOf(xyObjectToSorted<MixedPoint>)
    .parameter(1)
    .toEqualTypeOf<'x' | undefined>();
  expectTypeOf(xyObjectToSorted(points, 'y')).toEqualTypeOf<Point[]>();
  expectTypeOf(xyObjectToSorted(points, undefined)).toEqualTypeOf<Point[]>();
});

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

test.each([255, 256, 1000])(
  'matches the numeric comparator without reordering the input (%i points)',
  (length) => {
    const points = Array.from({ length }, (_, index) => ({
      x: index,
      intensity: (index * 37) % 53,
    }));
    const original = points.slice();
    const expected = points.toSorted((a, b) => a.intensity - b.intensity);

    const sorted = xyObjectToSorted(points, 'intensity');

    expect(sorted).toStrictEqual(expected);
    expect(sorted).not.toBe(points);
    expect(points).toStrictEqual(original);
  },
);

test.each([255, 256])(
  'sorts NaNs last in input order (%i points)',
  (length) => {
    const negativeNaN = new Float64Array(
      BigUint64Array.of(0xfff8_0000_0000_0000n).buffer,
    )[0];
    const values = [Number.NaN, 3, negativeNaN, 1, Infinity, -Infinity];
    const points = Array.from({ length }, (_, x) => ({ x, y: values[x] ?? 2 }));

    expect(xyObjectToSorted(points, 'y').map(({ x }) => x)).toStrictEqual([
      5,
      3,
      ...points.slice(6).map(({ x }) => x),
      1,
      4,
      0,
      2,
    ]);
  },
);

test.each([255, 256])(
  'keeps signed-zero ties in input order (%i points)',
  (length) => {
    const values = [0, -0, 0];
    const points = Array.from({ length }, (_, y) => ({ x: values[y] ?? 1, y }));

    expect(xyObjectToSorted(points).slice(0, 3)).toStrictEqual(
      points.slice(0, 3),
    );
  },
);
