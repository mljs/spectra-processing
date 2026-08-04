import type { DataXY } from 'cheminfo-types';
import { XSadd } from 'ml-xsadd';
import { expect, test } from 'vitest';

import { xyRollingCircle } from '../xyRollingCircle.ts';
import { xyRollingCircleTransform } from '../xyRollingCircleTransform.ts';

test('a big circle only touches the two apexes', () => {
  const data: DataXY<number[]> = {
    x: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    y: [0, 1, 2, 1, 0, 1, 2, 1, 0],
  };

  const { y: curve, points } = xyRollingCircle(data, {
    radius: 5,
    shifted: false,
  });

  expect(curve).toStrictEqual(
    xyRollingCircleTransform(data, { radius: 5, shifted: false }),
  );
  expect(points).toStrictEqual([
    { x: 2, y: 2, index: 2 },
    { x: 6, y: 2, index: 6 },
  ]);
});

test('a small circle touches every point of a convex slope', () => {
  const data: DataXY<number[]> = {
    x: [0, 1, 2, 3, 4],
    y: [0, 1, 2, 3, 4],
  };

  const { points } = xyRollingCircle(data, { radius: 0.5 });

  expect(points).toHaveLength(5);
  expect(points[0]).toStrictEqual({ x: 0, y: 0, index: 0 });
  expect(points[4]).toStrictEqual({ x: 4, y: 4, index: 4 });
});

test('from the bottom it touches the minima with the original y values', () => {
  const data: DataXY<number[]> = {
    x: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    y: [10, 11, 12, 11, 10, 11, 12, 11, 10],
  };

  const { y: curve, points } = xyRollingCircle(data, {
    radius: 5,
    position: 'bottom',
    shifted: false,
  });

  // the three valleys, a circle that flat also reaches the middle one
  expect(points).toStrictEqual([
    { x: 0, y: 10, index: 0 },
    { x: 4, y: 10, index: 4 },
    { x: 8, y: 10, index: 8 },
  ]);

  for (const point of points) {
    expect(curve[point.index]).toBeCloseTo(point.y, 10);
  }
});

test('touched points support the curve', () => {
  const data: DataXY<number[]> = {
    x: [0, 1, 2, 3, 4, 5, 6],
    y: [0, 3, 1, 4, 1, 5, 0],
  };

  const { y: curve, points } = xyRollingCircle(data, {
    radius: 2,
    shifted: false,
  });

  expect(points).toStrictEqual([
    { x: 1, y: 3, index: 1 },
    { x: 3, y: 4, index: 3 },
    { x: 5, y: 5, index: 5 },
  ]);

  for (const point of points) {
    expect(curve[point.index]).toBeCloseTo(point.y, 10);
  }
  // the curve stays above the data
  for (let i = 0; i < curve.length; i++) {
    expect(curve[i]).toBeGreaterThanOrEqual(data.y[i]);
  }
});

test('the vertical radius controls how many points are touched', () => {
  const data: DataXY<number[]> = {
    x: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    y: [0, 10, 20, 10, 0, 10, 20, 10, 0],
  };

  // a flat ellipse behaves like a horizontal segment: only the maxima support it
  const flat = xyRollingCircle(data, {
    radius: 5,
    relativeYRadius: 0.1,
  });

  expect(flat.points.map((point) => point.index)).toStrictEqual([2, 6]);

  // a tall ellipse behaves like a needle: every point supports its own shape
  const tall = xyRollingCircle(data, {
    radius: 5,
    relativeYRadius: 50,
  });

  expect(tall.points.map((point) => point.index)).toStrictEqual([
    0, 1, 2, 3, 4, 5, 6, 7, 8,
  ]);
});

test('empty data', () => {
  expect(xyRollingCircle({ x: [], y: [] })).toStrictEqual({
    y: new Float64Array(),
    points: [],
  });
});

/**
 * Straightforward O(n²) implementation, scanning the whole array and using a
 * square root per point, to check the sliding window and the squared comparison.
 * @param data - data with x and y arrays.
 * @param radius - radius along x.
 * @param yRadius - radius along y.
 * @returns the indexes of the touched points.
 */
function referenceTouchingIndexes(
  data: DataXY<number[]>,
  radius: number,
  yRadius: number,
): number[] {
  const { x, y } = data;
  const yScale = yRadius / radius;
  const touched = new Set<number>();
  const arc = (i: number, j: number) => {
    const deltaX = x[j] - x[i];
    if (Math.abs(deltaX) > radius) return Number.NEGATIVE_INFINITY;
    return y[j] + yScale * Math.sqrt(radius * radius - deltaX * deltaX);
  };

  for (let i = 0; i < x.length; i++) {
    let center = y[i] + yRadius;
    for (let j = 0; j < x.length; j++) {
      center = Math.max(center, arc(i, j));
    }
    const limit = center - 1e-10 * (Math.abs(center) + yRadius);
    for (let j = 0; j < x.length; j++) {
      if (arc(i, j) >= limit) touched.add(j);
    }
  }

  return Array.from(touched).toSorted((first, second) => first - second);
}

test('matches a naive implementation on random data', () => {
  const { random } = new XSadd(42);
  const size = 200;
  const data: DataXY<number[]> = { x: [], y: [] };
  for (let i = 0; i < size; i++) {
    data.x.push(i + random() * 0.5); // unevenly spaced
    data.y.push(Math.sin(i / 20) * 1000 - 500 + random() * 200);
  }

  for (const radius of [0.5, 1, 3.5, 10, 40]) {
    for (const yRadius of [0.01, 1, 100, 5000]) {
      const { points } = xyRollingCircle(data, { radius, yRadius });

      expect(points.map((point) => point.index)).toStrictEqual(
        referenceTouchingIndexes(data, radius, yRadius),
      );
    }
  }
});
