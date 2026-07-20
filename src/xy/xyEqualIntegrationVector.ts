import type { DataXY } from 'cheminfo-types';

import type { XGetFromToIndexOptions } from '../x/xGetFromToIndex.ts';

import type { CumulativeDensity } from './utils/cumulativeDensity.ts';
import {
  evaluateCumulative,
  getCumulativeDensity,
} from './utils/cumulativeDensity.ts';
import { xyCheck } from './xyCheck.ts';

export interface XYEqualIntegrationVectorOptions extends XGetFromToIndexOptions {
  /**
   * Number of levels of the binary tree. The returned vector has `2 ** depth - 1` entries.
   * @default 5
   */
  depth?: number;
}

/**
 * Split a spectrum in parts that all have the same integration and return the x values of the splits.
 * The first entry splits the spectrum in two halves of equal integration, the two next ones split each half
 * again, etc. This is the same as looking for the 1/2, then 1/4 and 3/4, then 1/8, 3/8, 5/8 and 7/8 fractions
 * of the total integration, which is how it is computed.
 * This describes a spectrum by a small vector and should provide an efficient way to store and search
 * similar spectra, comparing the vectors with `xEqualIntegrationVectorSimilarity`.
 * A split never lands between the peaks: it follows the integration, so it points at the signal itself. The
 * noise of a long baseline does not drag it either, because a point is never weighted by its own x value.
 * The data is considered as a piecewise linear density, so the result varies continuously with the y values
 * and hardly depends on the sampling density.
 * The window may extend beyond the data, the missing points being considered to have a y value of zero.
 * @param data - object that contains property x (an ordered increasing array) and y (an array).
 * @param options - options.
 * @returns array of x values splitting the spectrum in parts of equal integration.
 */
export function xyEqualIntegrationVector(
  data: DataXY,
  options: XYEqualIntegrationVectorOptions = {},
): Float64Array<ArrayBuffer> {
  xyCheck(data, { minLength: 2 });
  const { depth = 5 } = options;
  const cumulative = getCumulativeDensity(data, options);
  const { beginX, endX } = cumulative;
  const total = evaluateCumulative(cumulative, endX);

  const results = new Float64Array((1 << depth) - 1);
  let index = 0;
  for (let level = 0; level < depth; level++) {
    const nbSlots = 1 << level;
    for (let slot = 0; slot < nbSlots; slot++) {
      const fraction = (2 * slot + 1) / (2 * nbSlots);
      results[index++] = findFraction(
        cumulative,
        beginX,
        endX,
        total * fraction,
      );
    }
  }

  return results;
}

/**
 * Dichotomic search of the x value for which the integration reaches a target.
 * @param cumulative - cumulated integration of the density.
 * @param beginX - beginning of the window.
 * @param endX - end of the window.
 * @param target - integration to reach.
 * @returns the x value.
 */
function findFraction(
  cumulative: CumulativeDensity,
  beginX: number,
  endX: number,
  target: number,
): number {
  let low = beginX;
  let high = endX;
  // the interval is halved 60 times, far below the precision of a float64
  for (let i = 0; i < 60; i++) {
    const middle = (low + high) / 2;
    if (evaluateCumulative(cumulative, middle) < target) {
      low = middle;
    } else {
      high = middle;
    }
  }
  return (low + high) / 2;
}
