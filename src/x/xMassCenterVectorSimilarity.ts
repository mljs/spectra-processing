import type { NumberArray } from 'cheminfo-types';

import { xEqualIntegrationVectorSimilarity } from './xEqualIntegrationVectorSimilarity.ts';

interface XMassCenterVectorSimilarityOptions {
  /**
   * Function that based on the difference between the two values, return a similarity score between 0 and 1
   * @default (a, b) => (a === b ? 1 : 0)
   */
  similarityFct?: (a: number, b: number) => number;

  /**
   * Should we recenter the tree ?
   * @default: true
   */
  recenter?: boolean;
}

/**
 * Check the similarity between array created by xyMassCenterVector
 * @deprecated The center of mass trees it compares are misleading, see `xyMassCenterVector`.
 * Use `xEqualIntegrationVectorSimilarity` together with `xyEqualIntegrationVector`.
 * @param array1 - first mass center vector.
 * @param array2 - second mass center vector.
 * @param options - options.
 * @returns similarity score between 0 and 1.
 */
export function xMassCenterVectorSimilarity(
  array1: NumberArray,
  array2: NumberArray,
  options: XMassCenterVectorSimilarityOptions = {},
): number {
  const {
    recenter = true,
    similarityFct = (a: number, b: number) => (a === b ? 1 : 0),
  } = options;
  return xEqualIntegrationVectorSimilarity(array1, array2, {
    recenter,
    similarityFct,
  });
}
