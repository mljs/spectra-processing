import type { DataXY } from 'cheminfo-types';

/**
 * Convert a flat interleaved array [x, y, x, y, ...] to a DataXY object.
 * @param data - Flat array alternating x and y values.
 * @returns DataXY object with separate x and y arrays.
 */
export function xyFromInterleaved(
  data: number[] | Float64Array,
): DataXY<Float64Array> {
  if (data.length % 2 !== 0) {
    throw new RangeError(
      `xyFromInterleaved: data length must be even, got ${data.length}`,
    );
  }
  const length = data.length / 2;
  const x = new Float64Array(length);
  const y = new Float64Array(length);
  for (let i = 0; i < length; i++) {
    x[i] = data[2 * i];
    y[i] = data[2 * i + 1];
  }
  return { x, y };
}
