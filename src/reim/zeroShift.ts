import { xRotate } from '../x/index.ts';

/**
 * Circular shift that moves the zero-frequency component to the center of the array (FFT shift).
 * For the inverse, the shift is reversed to restore the original layout.
 * @param data - input array
 * @param inverse - if true, shifts by ceil(n/2) instead of floor(n/2) to undo a previous zeroShift
 * @returns shifted array
 */
export function zeroShift(
  data: Float64Array,
  inverse?: boolean,
): Float64Array<ArrayBuffer> {
  const middle = inverse
    ? Math.ceil(data.length / 2)
    : Math.floor(data.length / 2);

  return xRotate(data, middle);
}
