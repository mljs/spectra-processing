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

  // numeric columns are preserved and strings are mapped through the dictionary
  expect(matrix).toStrictEqual([
    [78, 198, 220, 147],
    [81, 202, 200, 183],
    [88, 221, 222, 177],
    [78, 223, 210, 159],
    [82, 222, 202, 177],
    [86, 224, 218, 175],
    [78, 223, 225, 175],
    [76, 223, 226, 149],
    [96, 200, 216, 192],
  ]);
});
