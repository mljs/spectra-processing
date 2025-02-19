import type { NumberArray } from 'cheminfo-types';
import { expect, test } from 'vitest';

import { addWeights } from '../../utils/addWeights';
import { createSystemMatrix } from '../../utils/createSystemMatrix';
import { xSequentialFillFromTo } from '../../x';
import { matrixCholeskySolver } from '../matrixCholeskySolver';

test('solve a least square system', () => {
  const x = xSequentialFillFromTo({ from: 0, to: Math.PI, size: 101 });
  const noise = x.map(() => Math.random() * 0.1 - 0.05);
  const y = x.map((value, index) => Math.cos(value) + noise[index]);
  const weights = new Float64Array(y.length).fill(1);
  y[50] = 0.9; // add outliers

  const lambda = 20;
  const dimension = x.length;
  const upperTriangularNonZeros = createSystemMatrix(dimension, lambda);

  const weighted = addWeights(upperTriangularNonZeros, y, weights);

  const cho = matrixCholeskySolver(weighted.leftHandSide, dimension) as (
    b: NumberArray,
  ) => NumberArray;
  expect(cho).not.toBeNull();
  const smoothed = cho(weighted.rightHandSide);
  expect(smoothed[50]).toBeLessThan(0.2);
  expect(smoothed[50]).toBeGreaterThan(-0.2);

  //ignore the outlier, it implicates the smooth should pass closer to zero.
  weights[50] = 0;
  const weighted2 = addWeights(upperTriangularNonZeros, y, weights);
  const cho2 = matrixCholeskySolver(weighted.leftHandSide, dimension) as (
    b: NumberArray,
  ) => NumberArray;
  expect(cho).not.toBeNull();
  const smoothed2 = cho2(weighted2.rightHandSide);
  expect(smoothed2[50]).toBeLessThan(smoothed[50]);
});
