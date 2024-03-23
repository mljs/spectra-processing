import { expect, test } from 'vitest';

import { xyMergeByCentroids } from '../xyMergeByCentroids';

const originalPoints = {
  x: [0.01, 1.008, 1.01, 1.012, 1.02, 1.04],
  y: [1, 1, 1, 1, 1, 1],
};

test('base case', () => {
  expect(xyMergeByCentroids(originalPoints, [1.01, 1.04])).toStrictEqual({
    x: Float64Array.from([1.01, 1.04]),
    y: Float64Array.from([3, 1]),
  });
});

test('specify options', () => {
  expect(
    xyMergeByCentroids(originalPoints, [1, 1.03], { window: 0.013 }),
  ).toStrictEqual({
    x: Float64Array.from([1, 1.03]),
    y: Float64Array.from([3, 2]),
  });
});
