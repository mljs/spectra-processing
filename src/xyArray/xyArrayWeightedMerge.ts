import { DataXY } from 'cheminfo-types';

import { OptionsType, Point } from '..';

/**
 * Merge DataXY
 * We have an array of DataXY and the goal is to merge all the values for which the deltaX is small or equal to delta.
 * X values are weighted average
 *
 * @param spectra - spectra
 * @param options - Options
 * @param options.delta - The range in which the two x values of the spectra must be to be placed on the same line. It may also be a function that allows to change `delta` depending on the X values of the spectrum
 */
export function xyArrayWeightedMerge(
  spectra: DataXY[],
  options: OptionsType = {},
): DataXY {
  let { delta = 1 } = options;
  if (typeof delta === 'number') {
    let deltaNumber = delta;
    delta = () => deltaNumber;
  }
  spectra = spectra.filter((spectrum) => spectrum.x.length > 0);

  if (spectra.length === 0) return { x: [], y: [] };

  let x = [];
  let y = [];

  const positions = new Array(spectra.length).fill(0);
  const point: Point = { x: 0, y: 0 };

  nextValue(spectra, positions, point);
  let slot = {
    maxX: point.x + delta(point.x),
    sumY: point.y,
    sumXY: point.y * point.x,
  };

  while (spectra.length !== 0) {
    nextValue(spectra, positions, point);
    let sameSlot = point.x <= slot.maxX;
    if (!sameSlot) {
      if (slot.sumY > 0) {
        x.push(slot.sumXY / slot.sumY);
        y.push(slot.sumY);
      }
      slot.sumY = 0;
      slot.sumXY = 0;
    }

    slot.sumY += point.y;
    slot.sumXY += point.x * point.y;
    slot.maxX = point.x + delta(point.x);

    if (spectra.length === 0) {
      if (slot.sumY > 0) {
        x.push(slot.sumXY / slot.sumY);
        y.push(slot.sumY);
      }
    }
  }
  return { x, y };
}

/**
 * NextValue.
 *
 * @param spectra - Spectra.
 * @param positions - Positions array.
 * @param point - Point.
 */
function nextValue(
  spectra: DataXY[],
  positions: number[] | Float64Array | Float32Array | Uint16Array,
  point: Point,
) {
  let minIndex = 0;
  let minX = spectra[0].x[positions[0]];

  for (let i = 1; i < spectra.length; i++) {
    let currentX = spectra[i].x[positions[i]];
    if (currentX < minX) {
      minX = currentX;
      minIndex = i;
    }
  }

  point.x = minX;
  point.y = spectra[minIndex].y[positions[minIndex]];

  positions[minIndex]++;

  if (positions[minIndex] === spectra[minIndex].x.length) {
    (positions as number[]).splice(minIndex, 1);
    spectra.splice(minIndex, 1);
  }
}
