import { xDoubleTypedArrayLength } from '../../x/xDoubleTypedArrayLength.ts';
import { xGetApproximateSortOrder } from '../../x/xGetApproximateSortOrder.ts';

import type { MergedXY } from './mergeSortedXY.ts';
import { sortIntensitySlots } from './sortIntensitySlots.ts';

const FREE = 0xffffffff;

export interface GetIntensitySlotsOptions {
  /**
   * A point joins a slot when its x is within `delta` of the x of the most intense
   * point of that slot. It may also be a function that allows to change `delta`
   * depending on the x value.
   * @default 1
   */
  delta?: ((arg: number) => number) | number;
}

export interface IntensitySlots {
  /**
   * The intensity weighted average of the x of the points of each slot, ascending.
   */
  x: Float64Array;
  /**
   * The sum of the y of the points of each slot.
   */
  y: Float64Array;
  /**
   * The smallest x of each slot.
   */
  from: Float64Array;
  /**
   * The largest x of each slot.
   */
  to: Float64Array;
  /**
   * The number of points of each slot.
   */
  number: Uint32Array;
  /**
   * For each merged point, the index of the slot it belongs to.
   */
  slotIndex: Uint32Array;
}

/**
 * Groups points around the most intense ones.
 * The most intense point of the whole set opens the first slot and takes every
 * point within `delta` of it, the most intense of the remaining points opens the
 * next one, and so on until every point belongs to exactly one slot. Unlike a
 * chain of close neighbours, a slot can therefore never grow wider than `2 * delta`.
 * @param merged - all the points of all the spectra, ascending by x.
 * @param options - options.
 * @returns the slots, ascending by x.
 */
export function getIntensitySlots(
  merged: MergedXY,
  options: GetIntensitySlotsOptions = {},
): IntensitySlots {
  const { delta = 1 } = options;
  const getDelta = typeof delta === 'function' ? delta : () => delta;
  const { x, y } = merged;
  const length = x.length;

  const slotIndex = new Uint32Array(length).fill(FREE);
  // Union-find over the still free positions, so that claiming a point is done
  // once and the scan of a window never walks over the points already taken.
  const nextFree = new Uint32Array(length + 1);
  const previousFree = new Uint32Array(length + 1);
  for (let i = 0; i <= length; i++) {
    nextFree[i] = i;
    previousFree[i] = i;
  }

  let capacity = 1024;
  let sumY = new Float64Array(capacity);
  let sumXY = new Float64Array(capacity);
  let seeds = new Float64Array(capacity);
  let from = new Float64Array(capacity);
  let to = new Float64Array(capacity);
  let number = new Uint32Array(capacity);
  let numberOfSlots = 0;

  const order = xGetApproximateSortOrder(y, { descending: true });
  for (let i = 0; i < length; i++) {
    const seed = order[i];
    if (slotIndex[seed] !== FREE) continue;

    if (numberOfSlots === capacity) {
      capacity *= 2;
      sumY = xDoubleTypedArrayLength(sumY);
      sumXY = xDoubleTypedArrayLength(sumXY);
      seeds = xDoubleTypedArrayLength(seeds);
      from = xDoubleTypedArrayLength(from);
      to = xDoubleTypedArrayLength(to);
      number = xDoubleTypedArrayLength(number);
    }

    const slot = numberOfSlots++;
    const center = x[seed];
    const currentDelta = getDelta(center);
    const lowerLimit = center - currentDelta;
    const upperLimit = center + currentDelta;

    let slotSumY = 0;
    let slotSumXY = 0;
    let slotNumber = 0;
    let slotFrom = center;
    let slotTo = center;

    let position = seed;
    while (position < length && x[position] <= upperLimit) {
      slotIndex[position] = slot;
      nextFree[position] = position + 1;
      previousFree[position + 1] = position;
      slotSumY += y[position];
      slotSumXY += x[position] * y[position];
      slotNumber++;
      slotTo = x[position];
      position = findNext(nextFree, position + 1);
    }

    position = findPrevious(previousFree, seed);
    while (position > 0 && x[position - 1] >= lowerLimit) {
      const claimed = position - 1;
      slotIndex[claimed] = slot;
      nextFree[claimed] = claimed + 1;
      previousFree[claimed + 1] = claimed;
      slotSumY += y[claimed];
      slotSumXY += x[claimed] * y[claimed];
      slotNumber++;
      slotFrom = x[claimed];
      position = findPrevious(previousFree, claimed);
    }

    sumY[slot] = slotSumY;
    sumXY[slot] = slotSumXY;
    seeds[slot] = center;
    from[slot] = slotFrom;
    to[slot] = slotTo;
    number[slot] = slotNumber;
  }

  return sortIntensitySlots({
    numberOfSlots,
    sumY,
    sumXY,
    seeds,
    from,
    to,
    number,
    slotIndex,
  });
}

/**
 * Follows the union-find to the first free position at or after `position`.
 * @param nextFree - union-find of the free positions.
 * @param position - where to start looking.
 * @returns the first free position, at most the length of the data.
 */
function findNext(nextFree: Uint32Array, position: number): number {
  while (nextFree[position] !== position) {
    nextFree[position] = nextFree[nextFree[position]];
    position = nextFree[position];
  }
  return position;
}

/**
 * Follows the union-find to the first boundary at or before `position` whose
 * preceding point is still free.
 * @param previousFree - union-find of the free positions.
 * @param position - where to start looking.
 * @returns the boundary, 0 when no free point remains on the left.
 */
function findPrevious(previousFree: Uint32Array, position: number): number {
  while (previousFree[position] !== position) {
    previousFree[position] = previousFree[previousFree[position]];
    position = previousFree[position];
  }
  return position;
}
