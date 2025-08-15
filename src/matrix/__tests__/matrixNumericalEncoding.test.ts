import { expect, test } from 'vitest';

import { matrixNumericalEncoding } from '../matrixNumericalEncoding.ts';

import { datasetForEncoding } from './fixtures/encoding.ts';

test('should return a matrix of numbers', () => {
  const { matrix } = matrixNumericalEncoding(datasetForEncoding);
  const nonNumbers = matrix.flat().filter((value) => typeof value !== 'number');

  expect(nonNumbers).toHaveLength(0);
});
