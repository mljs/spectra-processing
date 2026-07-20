import { expect, test } from 'vitest';

import { xyEqualIntegrationVector } from '../../xy/index.ts';
import { xEqualIntegrationVectorSimilarity } from '../xEqualIntegrationVectorSimilarity.ts';

// a single peak, the spectrum starts and ends on the baseline
const data = { x: [1, 2, 3, 4, 5, 6, 7], y: [0, 1, 2, 1, 0, 0, 0] };
// exactly the same spectrum, shifted by 2 and padded with zeros
const shifted = {
  x: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  y: [0, 0, 0, 1, 2, 1, 0, 0, 0],
};

test('basic', () => {
  const vector = xyEqualIntegrationVector(data);

  expect(xEqualIntegrationVectorSimilarity(vector, vector)).toBeCloseTo(1);
});

test('a global shift is only penalized at the first level', () => {
  const vector1 = xyEqualIntegrationVector(data, { depth: 2 });
  const vector2 = xyEqualIntegrationVector(shifted, { depth: 2 });

  // zero padding does not change the integration, so the vector is exactly translated
  expect(vector2).toBeDeepCloseTo(
    [...vector1].map((value) => value + 2),
    10,
  );
  // only the first of the 2 levels differs once the tree is recentered
  expect(xEqualIntegrationVectorSimilarity(vector1, vector2)).toBeCloseTo(0.5);
});

test('a global shift, deeper tree', () => {
  const similarity = xEqualIntegrationVectorSimilarity(
    xyEqualIntegrationVector(data, { depth: 3 }),
    xyEqualIntegrationVector(shifted, { depth: 3 }),
  );

  expect(similarity).toBeCloseTo(2 / 3);
});

test('without recentering a global shift matches nothing', () => {
  const vector1 = xyEqualIntegrationVector(data, { depth: 3 });
  const vector2 = xyEqualIntegrationVector(shifted, { depth: 3 });
  const clone1 = vector1.slice();
  const clone2 = vector2.slice();

  expect(
    xEqualIntegrationVectorSimilarity(vector1, vector2, { recenter: false }),
  ).toBe(0);
  // the inputs must never be modified
  expect(vector1).toStrictEqual(clone1);
  expect(vector2).toStrictEqual(clone2);
});

test('a partial shift, only the second half moves', () => {
  const data1 = {
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    y: [1, 2, 2, 1, 0, 1, 2, 2, 1],
  };
  const data2 = {
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    y: [1, 2, 2, 1, 0, 0, 0, 1, 2, 2, 1],
  };

  expect(
    xEqualIntegrationVectorSimilarity(
      xyEqualIntegrationVector(data1, { depth: 2 }),
      xyEqualIntegrationVector(data2, { depth: 2 }),
    ),
  ).toBeCloseTo(0.75);
  expect(
    xEqualIntegrationVectorSimilarity(
      xyEqualIntegrationVector(data1, { depth: 3 }),
      xyEqualIntegrationVector(data2, { depth: 3 }),
    ),
  ).toBeCloseTo(5 / 6);
});

test('a kind function for similarity', () => {
  const similarity = xEqualIntegrationVectorSimilarity(
    xyEqualIntegrationVector(data, { depth: 3 }),
    xyEqualIntegrationVector(shifted, { depth: 3 }),
    { similarityFct: (a, b) => (b - a < 0.1 ? 1 : (b - a) / (b + a)) },
  );

  // the shift of 2 scores (b - a) / (b + a) = 0.25 on the first level, the two others match
  expect(similarity).toBeCloseTo(0.25 / 3 + 1 / 3 + 1 / 3);
});

test('the array length must be a power of 2 minus 1', () => {
  expect(() =>
    xEqualIntegrationVectorSimilarity([1, 2, 3], [1, 2, 3, 4]),
  ).toThrow('the array length is not a power of 2 minus 1');
});
