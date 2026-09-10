import type { DataXY } from 'cheminfo-types';

import { xGetSortOrder, xIsMonotonic } from '../x/index.ts';
import { RADIX_ORDER_MIN_LENGTH } from '../x/utils/radixSortOrder.ts';

/**
 * This function performs a quick sort of the x array while transforming the y array to preserve the coordinates.
 * @param data - object that contains property x (Array) and y (Array).
 * @returns the points, ascending by x.
 */
export function xySortX(data: DataXY): DataXY<Float64Array> {
  const { x, y } = data;

  if (xIsMonotonic(x) && x.length > 1) {
    const floatX = Float64Array.from(x);
    const floatY = Float64Array.from(y);
    if ((floatX.at(-1) as number) < floatX[0]) {
      floatX.reverse();
      floatY.reverse();
    }
    return {
      x: floatX,
      y: floatY,
    };
  }

  const response = {
    x: new Float64Array(x.length),
    y: new Float64Array(y.length),
  };

  if (x.length >= RADIX_ORDER_MIN_LENGTH) {
    const order = xGetSortOrder(x);
    for (let i = 0; i < order.length; i++) {
      const at = order[i];
      response.x[i] = x[at];
      response.y[i] = y[at];
    }
    return response;
  }

  const xyObject = Array.from(x, (val, index) => ({
    x: val,
    y: y[index],
  }));
  xyObject.sort((a, b) => a.x - b.x);

  for (let i = 0; i < x.length; i++) {
    response.x[i] = xyObject[i].x;
    response.y[i] = xyObject[i].y;
  }

  return response;
}
