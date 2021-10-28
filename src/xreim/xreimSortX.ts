import { DataX } from '..';
/**
 * Sort object of array, x has to be monotone.
 *
 * @param {DataX} data Object of kind {x:[], re:[], im:[]}.
 * @returns {DataX} Data
 */

/**
 * @param {DataX} data {x:number[], re:number[], im:number[]}.
 * @returns {DataX} {x:number[], re:number[], im:number[]}.
 */
export function xreimSortX(data: DataX): DataX {
  const { x, re, im } = data;

  if (x.length !== re.length || x.length !== im.length) {
    throw TypeError('xreimSortX: length of x, re and im must be identical');
  }

  if (x.length < 2 || x[0] < x[1]) return data;

  return {
    x: x.slice(0).reverse(),
    re: re.slice(0).reverse(),
    im: im.slice(0).reverse(),
  };
}