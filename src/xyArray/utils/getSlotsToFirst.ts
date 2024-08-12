import { DataXY } from 'cheminfo-types';

import { xyArrayWeightedMerge } from '../xyArrayWeightedMerge';

export interface GetSlotsToFirstOptions {
  /**
   * The range in which the two x values of the data/spectra must be to be placed on the same line. It may also be a function that allows to change `delta` depending on the X values of the spectrum
   * @default 1
   */
  delta?: ((arg: number) => number) | number;
}

export interface Slot {
  from: number;
  to: number;
  value: number;
}

/**
 * GetSlotsToFirst.
 * @param data - data.
 * @param options - Options.
 */
export function getSlotsToFirst(
  data: DataXY[],
  options: GetSlotsToFirstOptions = {},
): Slot[] {
  const { delta = 1 } = options;
  const deltaIsFunction = typeof delta === 'function';

  const firstXs = data[0].x;
  const slots: Slot[] = [];
  // we first create the slots based on the first spectrum
  for (const element of firstXs) {
    const currentDelta = deltaIsFunction ? delta(element) : delta;
    slots.push({
      from: element - currentDelta,
      to: element + currentDelta,
      value: element,
    });
  }

  const otherXs = xyArrayWeightedMerge(data.slice(1), options).x;
  let currentPosition = 0;
  for (const slot of slots) {
    while (
      otherXs[currentPosition] < slot.to &&
      currentPosition < otherXs.length
    ) {
      if (otherXs[currentPosition] < slot.from) {
        const currentDelta = deltaIsFunction
          ? delta(otherXs[currentPosition])
          : delta;
        slots.push({
          from: otherXs[currentPosition] - currentDelta,
          to: otherXs[currentPosition] + currentDelta,
          value: otherXs[currentPosition],
        });
      }
      currentPosition++;
    }
  }
  for (let i = currentPosition; i < otherXs.length; i++) {
    const currentDelta = deltaIsFunction ? delta(otherXs[i]) : delta;
    slots.push({
      from: otherXs[i] - currentDelta,
      to: otherXs[i] + currentDelta,
      value: otherXs[i],
    });
  }

  slots.sort((a, b) => a.value - b.value);

  // we prevent slots overlap in the first spectrum
  for (let i = 0; i < slots.length - 1; i++) {
    if (slots[i].to > slots[i + 1].from) {
      const middle = (slots[i].value + slots[i + 1].value) / 2;
      slots[i].to = middle;
      slots[i + 1].from = middle;
    }
  }
  return slots;
}
