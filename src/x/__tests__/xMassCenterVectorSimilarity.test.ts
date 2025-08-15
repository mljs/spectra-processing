import { expect, test } from 'vitest';

import { xyMassCenterVector } from '../../xy/index.ts';
import { xMassCenterVectorSimilarity } from '../xMassCenterVectorSimilarity.ts';

test('basic', () => {
  const data = {
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    y: [1, 2, 2, 1, 0, 1, 2, 2, 1],
  };

  const vector1 = xyMassCenterVector(data);
  const vector2 = xyMassCenterVector(data);
  const similarity = xMassCenterVectorSimilarity(vector1, vector2);

  expect(similarity).toBeCloseTo(1);
});

test('a global shift, only penality at the first level', () => {
  const data1 = {
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    y: [1, 2, 2, 1, 0, 1, 2, 2, 1],
  };
  const data2 = {
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    y: [0, 0, 1, 2, 2, 1, 0, 1, 2, 2, 1],
  };

  const vector1 = xyMassCenterVector(data1, { depth: 2 });
  const vector2 = xyMassCenterVector(data2, { depth: 2 });
  const similarity = xMassCenterVectorSimilarity(vector1, vector2);

  expect(similarity).toBeCloseTo(0.5);
});

test('a partial shift, this leads to no similarity', () => {
  const data1 = {
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    y: [1, 2, 2, 1, 0, 1, 2, 2, 1],
  };
  const data2 = {
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    y: [1, 2, 2, 1, 0, 0, 0, 1, 2, 2, 1],
  };

  const vector1 = xyMassCenterVector(data1, { depth: 2 });
  const vector2 = xyMassCenterVector(data2, { depth: 2 });
  const similarity = xMassCenterVectorSimilarity(vector1, vector2);

  expect(similarity).toBeCloseTo(0);
});

test('a partial shift, no recenter helps in this case', () => {
  const data1 = {
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    y: [1, 2, 2, 1, 0, 1, 2, 2, 1],
  };
  const data2 = {
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    y: [1, 2, 2, 1, 0, 0, 0, 1, 2, 2, 1],
  };

  const vector1 = xyMassCenterVector(data1, { depth: 2 });
  const vector2 = xyMassCenterVector(data2, { depth: 2 });

  const vector1clone = vector1.slice();
  const vector2clone = vector2.slice();

  const similarity = xMassCenterVectorSimilarity(vector1, vector2, {
    recenter: false,
  });

  expect(similarity).toBeCloseTo(0.25);

  expect(vector1).toStrictEqual(vector1clone);
  expect(vector2).toStrictEqual(vector2clone);
});

test('a partial shift, level 3 that should match again', () => {
  const data1 = {
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    y: [1, 2, 2, 1, 0, 1, 2, 2, 1],
  };
  const data2 = {
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    y: [1, 2, 2, 1, 0, 0, 0, 1, 2, 2, 1],
  };

  const vector1 = xyMassCenterVector(data1, { depth: 3 });
  const vector2 = xyMassCenterVector(data2, { depth: 3 });
  const similarity = xMassCenterVectorSimilarity(vector1, vector2);

  expect(similarity).toBeCloseTo(0.333333);
});

test('a partial shift, we have a kind function for similarity', () => {
  const data1 = {
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    y: [1, 2, 2, 1, 0, 1, 2, 2, 1],
  };
  const data2 = {
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    y: [1, 2, 2, 1, 0, 0, 0, 1, 2, 2, 1],
  };

  const vector1 = xyMassCenterVector(data1, { depth: 3 });
  const vector2 = xyMassCenterVector(data2, { depth: 3 });

  const vector1clone = vector1.slice();
  const vector2clone = vector2.slice();

  const similarity = xMassCenterVectorSimilarity(vector1, vector2, {
    similarityFct: (a: number, b: number) =>
      b - a < 0.1 ? 1 : (b - a) / (b + a),
  });

  expect(similarity).toBeCloseTo(0.53956);

  // we check that we don't touch the original array
  expect(vector1).toStrictEqual(vector1clone);
  expect(vector2).toStrictEqual(vector2clone);
});
