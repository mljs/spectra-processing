import { reimZeroFilling } from '../reim';
import type { DataXReIm } from '../types';

/**
 * This function make a zero filling to re and im part.
 * @param data - object of kind {x:[], re:[], im:[]}
 * @param totalLength - final number of points
 * @returns - data.
 */
export function xreimZeroFilling(
  data: DataXReIm,
  totalLength: number,
): DataXReIm {
  const { x, re, im } = data;
  const length = x.length;
  if (totalLength === 0 || length === totalLength) return data;

  if (length > totalLength) {
    return {
      x: x.slice(0, totalLength),
      re: re.slice(0, totalLength),
      im: im.slice(0, totalLength),
    };
  }

  const newX = new Float64Array(totalLength);

  newX.set(x);
  const deltaX = ((x.at(-1) as number) - x[0]) / (length - 1);
  for (let i = length; i < totalLength; i++) {
    newX[i] = newX[i - 1] + deltaX;
  }

  return {
    x: newX,
    ...reimZeroFilling({ re, im }, totalLength),
  };
}
