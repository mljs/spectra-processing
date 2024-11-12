import { DataXY } from 'cheminfo-types';

/**
 * Order object of array, x has to be monotone. Ensure x is growing
 * @param data - Object of kind {x:[], y:[]}.
 */
export function xyGrowingX(data: DataXY): DataXY {
  const { x, y } = data;

  if (x.length !== y.length) {
    throw new TypeError('length of x and y must be identical');
  }

  if (x.length < 2 || x[0] < (x.at(-1) as number)) return data;

  return {
    x: x.slice(0).reverse(),
    y: y.slice(0).reverse(),
  };
}
