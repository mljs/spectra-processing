import { check } from './check';

/**
 * Returns the numberMaxPoints points with the bigger y.
 * @param {object} points - Object of points contains property x (an ordered increasing array) and y (an array)
 * @param {number} numberMaxPoints Number of points to keep
 * @returns {object} The points filtered to keep the `numberMaxPoints` most intense points of the input
 */
export function getNMaxY(points, numberMaxPoints) {
  check(points);
  if (points.x.length <= numberMaxPoints) {
    return points;
  } else {
    let newX = new Array(numberMaxPoints);
    let newY = new Array(numberMaxPoints);

    // slice() is used to make a copy of the array, because sort() is IPM
    let threshold = points.y.slice().sort((a, b) => b - a)[numberMaxPoints - 1];

    let index = 0;
    for (let i = 0; i < points.x.length; i++) {
      if (points.y[i] >= threshold) {
        newX[index] = points.x[i];
        newY[index] = points.y[i];
        index++;
      }
      if (index === numberMaxPoints) {
        return { x: newX, y: newY };
      }
    }
  }
}
