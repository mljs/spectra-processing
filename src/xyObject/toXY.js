/**
 *
 * @param {array} [data] array of points {x,y}
 */
export function toXY(data) {
  return {
    x: data.map((entry) => entry.x),
    y: data.map((entry) => entry.y),
  };
}
