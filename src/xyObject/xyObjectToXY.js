/**
 *
 * @param {ArrayPoints} [data] array of points {x,y}
 */
export function xyObjectToXY(data) {
  return {
    x: data.map((entry) => entry.x),
    y: data.map((entry) => entry.y),
  };
}
