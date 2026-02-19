import { xRotate } from '../x/index.ts';

export function zeroShift(
  data: Float64Array,
  inverse?: boolean,
): Float64Array<ArrayBuffer> {
  const middle = inverse
    ? Math.ceil(data.length / 2)
    : Math.floor(data.length / 2);

  return xRotate(data, middle);
}
