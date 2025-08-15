import { expect, test } from 'vitest';

import { matrixApplyNumericalEncoding } from '../matrixApplyNumericalEncoding.ts';
import { matrixNumericalEncoding } from '../matrixNumericalEncoding.ts';

import { datasetForEncoding } from './fixtures/encoding.ts';

const datasetToEncode = [
  [78, 'o', 'ab', 147],
  [81, 'p', 'u', 183],
  [88, 'q', 's', 177],
  [78, 'r', 'x', 159],
  [82, 's', 'p', 177],
  [86, 't', 'n', 175],
  [78, 'r', 'ac', 175],
  [76, 'r', 'ad', 149],
  [96, 'u', 'l', 192],
];

test('should return an array of numbers', () => {
  const { dictCategoricalToNumerical } =
    matrixNumericalEncoding(datasetForEncoding);
  const matrix = matrixApplyNumericalEncoding(
    datasetToEncode,
    dictCategoricalToNumerical,
  );

  const nonNumbers = matrix.flat().filter((value) => typeof value !== 'number');

  expect(nonNumbers).toHaveLength(0);
});
