import { xGetSortOrder } from '../../x/xGetSortOrder.ts';

import type { IntensitySlots } from './getIntensitySlots.ts';

export interface RawIntensitySlots {
  numberOfSlots: number;
  sumY: Float64Array;
  sumXY: Float64Array;
  seeds: Float64Array;
  from: Float64Array;
  to: Float64Array;
  number: Uint32Array;
  slotIndex: Uint32Array;
}

/**
 * Turns the slots built by decreasing intensity into slots ascending by x.
 * @param raw - the slots, by decreasing intensity of the point that opened them.
 * @returns the slots, ascending by x, and the slot of each merged point.
 */
export function sortIntensitySlots(raw: RawIntensitySlots): IntensitySlots {
  const { numberOfSlots, sumY, sumXY, seeds, slotIndex } = raw;

  const centers = new Float64Array(numberOfSlots);
  for (let i = 0; i < numberOfSlots; i++) {
    // A slot with no intensity at all has no weighted average, it stays where
    // the point that opened it was.
    centers[i] = sumY[i] === 0 ? seeds[i] : sumXY[i] / sumY[i];
  }

  const bySlot = xGetSortOrder(centers);

  const x = new Float64Array(numberOfSlots);
  const y = new Float64Array(numberOfSlots);
  const from = new Float64Array(numberOfSlots);
  const to = new Float64Array(numberOfSlots);
  const number = new Uint32Array(numberOfSlots);
  const rankOfSlot = new Uint32Array(numberOfSlots);
  for (let rank = 0; rank < numberOfSlots; rank++) {
    const slot = bySlot[rank];
    rankOfSlot[slot] = rank;
    x[rank] = centers[slot];
    y[rank] = sumY[slot];
    from[rank] = raw.from[slot];
    to[rank] = raw.to[slot];
    number[rank] = raw.number[slot];
  }

  for (let i = 0; i < slotIndex.length; i++) {
    slotIndex[i] = rankOfSlot[slotIndex[i]];
  }

  return { x, y, from, to, number, slotIndex };
}
