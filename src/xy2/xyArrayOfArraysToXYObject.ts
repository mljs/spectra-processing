import { DataXY } from 'cheminfo-types';

/**
 * Convert an array of XY arrays to a DataXY object containing x,y arrays
 *
 * @param data - array of arrays [[x,y],[x,y],...]
 */
export function xyArrayOfArraysToXYObject(data: Array<Array<any>>): DataXY {
  const objecXYtoReturn = { x: Array(...[]), y: Array(...[]) };

  for (let xyValue of data) {
    objecXYtoReturn.x.push(xyValue[0]);
    objecXYtoReturn.y.push(xyValue[1]);
  }
  return objecXYtoReturn;
}
