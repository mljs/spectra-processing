import { DataXY } from 'cheminfo-types';

/**
 * Order object of array, x has to be monotone. Ensure x is growing
 *
 * @param data - Object of kind {x:[], y:[]}.
 */
export function xyGrowingX(data: DataXY): DataXY {
  const { x, y } = data;

  if (x.length !== y.length) {
    throw TypeError('sortX: length of x and y must be identical');
  }

  if (x.length < 2 || x[0] < x[1]) return data;

  return {
    x: x.slice(0).reverse(),
    y: y.slice(0).reverse(),
  };
}
