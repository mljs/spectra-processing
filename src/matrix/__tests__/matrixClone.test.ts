import { expect, test } from 'vitest';

import { matrixClone } from '../matrixClone';

import { datasetForEncoding } from './fixtures/encoding';

test('should return an array of numbers', () => {
  const matrix = matrixClone(datasetForEncoding);

  expect(matrix).toStrictEqual(datasetForEncoding);
  expect(matrix).not.toBe(datasetForEncoding);
});
