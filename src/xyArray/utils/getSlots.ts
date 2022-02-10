import { DataXY } from 'cheminfo-types';

/**
 * GetSlots.
 *
 * @param data - data.
 * @param options - Options.
 */
export function getSlots(
  data: DataXY[],
  options: {
    /**
     * The range in which the two x values of the data/spectra must be to be placed on the same line. It may also be a function that allows to change `delta` depending on the X values of the spectrum
     * @default 1
     */
    delta?: ((arg: number) => number) | number;
  } = {},
): {
  from: number;
  to: number;
  average: number;
  sum: number;
  number: number;
}[] {
  const { delta = 1 } = options;
  const deltaIsFunction = typeof delta === 'function';

  let possibleXs = Float64Array.from(
    ([] as number[]).concat(...data.map((spectrum) => spectrum.x as number[])),
  ).sort();

  if (possibleXs.length < 1) {
    throw new Error('xyArrayMerge can not process empty arrays');
  }

  let currentSlot = {
    from: possibleXs[0],
    to: possibleXs[0],
    average: possibleXs[0],
    sum: possibleXs[0],
    number: 1,
  };
  let slots: {
    from: number;
    to: number;
    average: number;
    sum: number;
    number: number;
  }[] = [currentSlot];
  for (let i = 1; i < possibleXs.length; i++) {
    let currentDelta = deltaIsFunction ? delta(possibleXs[i]) : delta;
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
