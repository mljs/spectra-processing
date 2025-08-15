import { expect, test } from 'vitest';

import { matrixNumericalDecoding } from '../matrixNumericalDecoding.ts';
import { matrixNumericalEncoding } from '../matrixNumericalEncoding.ts';

import { datasetForEncoding } from './fixtures/encoding.ts';

test('The encoded and decoded dataset should equal the original dataset', () => {
  const { matrix, dictCategoricalToNumerical } =
    matrixNumericalEncoding(datasetForEncoding);
  const decodedMatrix = matrixNumericalDecoding(
    matrix,
    dictCategoricalToNumerical,
  );

  expect(decodedMatrix).toStrictEqual(datasetForEncoding);
});
