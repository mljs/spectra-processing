import { expect, test } from 'vitest';

import { matrixNumericalDecoding } from '../matrixNumericalDecoding';
import { matrixNumericalEncoding } from '../matrixNumericalEncoding';

import { datasetForEncoding } from './fixtures/encoding';

test('The encoded and decoded dataset should equal the original dataset', () => {
  const { matrix, dictCategoricalToNumerical } =
    matrixNumericalEncoding(datasetForEncoding);
  const decodedMatrix = matrixNumericalDecoding(
    matrix,
    dictCategoricalToNumerical,
  );

  expect(decodedMatrix).toStrictEqual(datasetForEncoding);
});
