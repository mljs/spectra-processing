import { Histogram } from '../../index';
import { xyArrayWeightedMerge } from '../xyArrayWeightedMerge';

/**
 * @param {Histogram[]} spectra spectra
 * @param {object} options options
 * @param {((arg: number) => number) | number } options.delta delta
 * @returns {{ from: number; to: number; value: number }[]} result
 */
export function getSlotsToFirst(
  spectra: Histogram[],
  options: { delta?: ((arg: number) => number) | number } = {},
): { from: number; to: number; value: number }[] {
  const { delta = 1 } = options;
  const deltaIsFunction = typeof delta === 'function';

  let firstXs = spectra[0].x;
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

  let otherXs = xyArrayWeightedMerge(spectra.slice(1), options).x;
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
