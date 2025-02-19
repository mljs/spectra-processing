import type { NumberArray } from 'cheminfo-types';
import { expect, test } from 'vitest';

import { matrixCuthillMckee } from '../matrixCuthillMckee';

test('permutation to reduce bandwidth', () => {
  const dimension = 10;
  const matrix = [
    [2, 2, 1.5],
    [1, 1, 1],
    [1, 4, 0.02],
    [5, 5, 1.2],
    [7, 7, 1.6],
    [4, 4, 2.6],
    [3, 3, 1.1],
    [4, 7, 0.09],
    [4, 6, 0.16],
    [0, 0, 1.7],
    [4, 8, 0.52],
    [0, 8, 0.13],
    [6, 6, 1.3],
    [7, 8, 0.11],
    [4, 9, 0.53],
    [8, 8, 1.4],
    [9, 9, 3.1],
    [1, 9, 0.01],
    [6, 9, 0.56],
  ];

  const permutationEncodedArray = matrixCuthillMckee(matrix, dimension);

  const reducedBandwidthMatrix = permut(
    matrix,
    permutationEncodedArray,
    dimension,
  );
  expect(bandwidth(reducedBandwidthMatrix)).toBeLessThan(bandwidth(matrix));
});

function permut(
  nonZerosArray: NumberArray[],
  permutationEncoded: NumberArray,
  dimension: number,
) {
  const pinv = new Array(dimension);
  for (let k = 0; k < dimension; k++) {
    pinv[permutationEncoded[k]] = k;
  }
  const mt: NumberArray[] = new Array(nonZerosArray.length);
  for (let a = 0; a < nonZerosArray.length; ++a) {
    const [r, c, value] = nonZerosArray[a];
    const [ar, ac] = [pinv[r], pinv[c]];
    mt[a] = ac < ar ? [ac, ar, value] : [ar, ac, value];
  }
  return mt;
}

function bandwidth(matrix: NumberArray[]) {
  let bandwidth = 0;
  for (const [i, j] of matrix) {
    const distance = Math.abs(i - j);
    if (distance > bandwidth) {
      bandwidth = distance;
    }
  }
  return bandwidth;
}
