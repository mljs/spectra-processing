import { DataXY } from 'cheminfo-types';

export interface GetSlotsOptions {
  /**
   * The range in which the two x values of the data/spectra must be to be placed on the same line. It may also be a function that allows to change `delta` depending on the X values of the spectrum
   * @default 1
   */
  delta?: ((arg: number) => number) | number;
}

export interface Slot {
  from: number;
  to: number;
  average: number;
  sum: number;
  number: number;
}

/**
 * GetSlots.
 * @param data - data.
 * @param options - Options.
 */
export function getSlots(
  data: DataXY[],
  options: GetSlotsOptions = {},
): Slot[] {
  const { delta = 1 } = options;
  const deltaIsFunction = typeof delta === 'function';

  const possibleXs = Float64Array.from(
    data.flatMap((spectrum) => spectrum.x as number[]),
  ).sort();

  if (possibleXs.length === 0) {
    throw new Error('can not process empty arrays');
  }

  let currentSlot: Slot = {
    from: possibleXs[0],
    to: possibleXs[0],
    average: possibleXs[0],
    sum: possibleXs[0],
    number: 1,
  };
  const slots: Slot[] = [currentSlot];
  for (let i = 1; i < possibleXs.length; i++) {
    const currentDelta = deltaIsFunction ? delta(possibleXs[i]) : delta;
    if (possibleXs[i] - currentSlot.to <= currentDelta) {
      currentSlot.to = possibleXs[i];
      currentSlot.number++;
      currentSlot.sum += possibleXs[i];
      currentSlot.average = currentSlot.sum / currentSlot.number;
    } else {
      currentSlot = {
        from: possibleXs[i],
        to: possibleXs[i],
        average: possibleXs[i],
        sum: possibleXs[i],
        number: 1,
      };
      slots.push(currentSlot);
    }
  }
  return slots;
}
