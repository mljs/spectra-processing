import { DataXY } from 'cheminfo-types';

import { xSortDescending } from '../x';

/**
 * Filter an array x/y based on various criteria x points are expected to be sorted
 * @param data - object containing 2 properties x and y
 * @param nbPeaks
 * @returns filtered data
 */
export function xyFilterTopYValues(data: DataXY, nbPeaks?: number) {
  if (nbPeaks === undefined) return data;
  if (nbPeaks > data.x.length) return data;

  const { x, y } = data;
  const newX: number[] = [];
  const newY: number[] = [];

  const descending = xSortDescending(y.slice());
  const threshold = descending[nbPeaks - 1];
  let nbThreshold = 0;
  for (let i = 0; i < nbPeaks; i++) {
    if (descending[i] === threshold) {
      nbThreshold++;
    }
  }

  for (let i = 0; i < x.length; i++) {
    if (y[i] > threshold) {
      newX.push(x[i]);
      newY.push(y[i]);
    } else if (y[i] === threshold) {
      nbThreshold--;
      if (nbThreshold >= 0) {
        newX.push(x[i]);
        newY.push(y[i]);
      }
    }
  }

  return {
    x: newX,
    y: newY,
  };
}
