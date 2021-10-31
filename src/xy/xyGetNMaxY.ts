import { ArrayType, DataXY } from '..';

import { xyCheck } from './xyCheck';

/**
 * Returns the numberMaxPoints points with the bigger y.
 *
 * @param {DataXY} data - Object that contains property x (an ordered increasing array) and y (an array)
 * @param {number} numberMaxPoints Number of points to keep
 * @returns {DataXY} The points filtered to keep the `numberMaxPoints` most intense points of the input
 */
export function xyGetNMaxY(data: DataXY, numberMaxPoints: number): DataXY {
  xyCheck(data);
  if (data.x.length <= numberMaxPoints) {
    return data;
  } else {
    let newX: ArrayType = new Array(numberMaxPoints);
    let newY: ArrayType = new Array(numberMaxPoints);

    // slice() is used to make a copy of the array, because sort() is IPM
    let threshold = data.y.slice().sort((a, b) => b - a)[numberMaxPoints - 1];

    let index = 0;
    for (let i = 0; i < data.x.length; i++) {
      if (data.y[i] >= threshold) {
        newX[index] = data.x[i];
        newY[index] = data.y[i];
        index++;
      }
      if (index === numberMaxPoints) {
        return { x: newX, y: newY };
      }
    }
    return data;
  }
}
