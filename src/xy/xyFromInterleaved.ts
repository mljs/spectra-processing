import type { DataXY } from 'cheminfo-types';

/**
 * Convert a flat interleaved array [x, y, x, y, ...] to a DataXY object.
 * @param data - Flat array alternating x and y values.
 * @returns DataXY object with separate x and y arrays.
 */
export function xyFromInterleaved(
  data: number[] | Float64Array,
): DataXY<number[]> {
  const length = data.length / 2;
  const x: number[] = new Array(length);
  const y: number[] = new Array(length);
  for (let i = 0; i < length; i++) {
    x[i] = data[2 * i];
    y[i] = data[2 * i + 1];
  }
  return { x, y };
}
