import type { NumberArray } from 'cheminfo-types';

export interface XEqualIntegrationVectorSimilarityOptions {
  /**
   * Function that based on the difference between the two values, return a similarity score between 0 and 1
   * The default one matches values that are identical up to the precision of a float64. The splits are the
   * solution of a dichotomic search, so two spectra that are the same up to a shift do not give bit to bit
   * identical values.
   * @default (a, b) => (Math.abs(a - b) <= 1e-9 * Math.max(1, Math.abs(a), Math.abs(b)) ? 1 : 0)
   */
  similarityFct?: (a: number, b: number) => number;

  /**
   * Should we recenter the tree ?
   * @default: true
   */
  recenter?: boolean;
}

/**
 * Check the similarity between array created by xyEqualIntegrationVector
 * @param array1 - first equal integration vector.
 * @param array2 - second equal integration vector.
 * @param options - options.
 * @returns similarity score between 0 and 1.
 */
export function xEqualIntegrationVectorSimilarity(
  array1: NumberArray,
  array2: NumberArray,
  options: XEqualIntegrationVectorSimilarityOptions = {},
): number {
  const {
    recenter = true,
    similarityFct = (a: number, b: number) =>
      Math.abs(a - b) <= 1e-9 * Math.max(1, Math.abs(a), Math.abs(b)) ? 1 : 0,
  } = options;
  const depth1 = getDepth(array1);
  const depth2 = getDepth(array2);
  const depth = Math.min(depth1, depth2);

  // need to copy the array because we shift the data in place if recenter is true
  if (recenter) {
    array1 = array1.slice();
  }

  let similarity = 0;
  // we will compare level by level
  // and recenter the array at each level

  for (let level = 0; level < depth; level++) {
    const maxSimilarity = 1 / depth / (1 << level);

    for (let slot = 0; slot < 1 << level; slot++) {
      const index = (1 << level) - 1 + slot;
      const value1 = array1[index];
      const value2 = array2[index];
      similarity += similarityFct(value1, value2) * maxSimilarity;
      if (recenter) {
        shiftSubtree(array1, depth, level, slot, value2 - value1);
      }
    }
  }
  return similarity;
}

function shiftSubtree(
  array: NumberArray,
  depth: number,
  level: number,
  slot: number,
  shift: number,
) {
  for (let currentLevel = level; currentLevel < depth; currentLevel++) {
    const levelSlotShift = slot * (1 << (currentLevel - level));
    const levelShift = (1 << currentLevel) - 1;
    const levelSlotSize = 1 << (currentLevel - level);
    for (
      let slotIndex = levelSlotShift;
      slotIndex < levelSlotShift + levelSlotSize;
      slotIndex++
    ) {
      const index = levelShift + slotIndex;
      array[index] += shift;
    }
  }
}

function getDepth(array: NumberArray) {
  const depth = Math.log2(array.length + 1);
  if (depth % 1 !== 0) {
    throw new Error('the array length is not a power of 2 minus 1');
  }
  return depth;
}
