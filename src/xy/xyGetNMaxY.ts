import { DataXY } from 'cheminfo-types';

import { xyCheck } from './xyCheck';

/**
 * Returns the numberMaxPoints points with the bigger y.
 *
 * @param data - Object that contains property x (an ordered increasing array) and y (an array)
 * @param numberMaxPoints - Number of points to keep
 * @returns - The points filtered to keep the `numberMaxPoints` most intense points of the input.
 */
export function xyGetNMaxY(data: DataXY, numberMaxPoints: number): DataXY {
  xyCheck(data);
  if (data.x.length <= numberMaxPoints) {
    return data;
  } else {
    let newX = new Float64Array(numberMaxPoints);
    let newY = new Float64Array(numberMaxPoints);

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
