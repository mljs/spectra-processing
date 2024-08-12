import { DataXY } from 'cheminfo-types';

/**
 * Convert an array of XY arrays to a DataXY object containing x,y arrays
 * @param data - array of arrays [[x,y],[x,y],...]
 */
export function xy2ToXY(data: Array<[number, number]>): DataXY<number[]> {
  const xy2: DataXY<number[]> = { x: [], y: [] };

  for (const xyValue of data) {
    xy2.x.push(xyValue[0]);
    xy2.y.push(xyValue[1]);
  }
  return xy2;
}
