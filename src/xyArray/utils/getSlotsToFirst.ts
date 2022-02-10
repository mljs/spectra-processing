import { DataXY } from 'cheminfo-types';

import { xyArrayWeightedMerge } from '../xyArrayWeightedMerge';
/**
 * GetSlotsToFirst.
 *
 * @param data - data.
 * @param options - Options.
 */
export function getSlotsToFirst(
  data: DataXY[],
  options: {
    /**
     * The range in which the two x values of the data/spectra must be to be placed on the same line. It may also be a function that allows to change `delta` depending on the X values of the spectrum
     * @default 1
     */
    delta?: ((arg: number) => number) | number;
  } = {},
): { from: number; to: number; value: number }[] {
  const { delta = 1 } = options;
  const deltaIsFunction = typeof delta === 'function';

  let firstXs = data[0].x;
  let slots: { from: number; to: number; value: number }[] = [];
  // we first create the slots based on the first spectrum
  firstXs.forEach((element) => {
    let currentDelta = deltaIsFunction ? delta(element) : delta;
    slots.push({
      from: element - currentDelta,
      to: element + currentDelta,
      value: element,
    });
  });

  let otherXs = xyArrayWeightedMerge(data.slice(1), options).x;
  let currentPosition = 0;
  for (let slot of slots) {
    while (
      otherXs[currentPosition] < slot.to &&
      currentPosition < otherXs.length
    ) {
      if (otherXs[currentPosition] < slot.from) {
        let currentDelta = deltaIsFunction
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
    let currentDelta = deltaIsFunction ? delta(otherXs[i]) : delta;
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
      let middle = (slots[i].value + slots[i + 1].value) / 2;
      slots[i].to = middle;
      slots[i + 1].from = middle;
    }
  }
  return slots;
}
