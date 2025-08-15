import { expect, test } from 'vitest';

import { matrixClone } from '../matrixClone.ts';

import { datasetForEncoding } from './fixtures/encoding.ts';

test('should return an array of numbers', () => {
  const matrix = matrixClone(datasetForEncoding);

  expect(matrix).toStrictEqual(datasetForEncoding);
  expect(matrix).not.toBe(datasetForEncoding);
});
