/**
 *This function performs a quick sort of the x array while transforming the y array to preserve the coordinates.
 * @param {DataXY} [data] Object that contains property x (Array) and y (Array)
 */
export function xySortX(data) {
  const { x, y } = data;

  let xyObject = x
    .map((val, index) => ({
      x: val,
      y: y[index],
    }))
    .sort((a, b) => a.x - b.x);

  let response = { x: [], y: [] };
  for (let i = 0; i < x.length; i++) {
    response.x.push(xyObject[i].x);
    response.y.push(xyObject[i].y);
  }

  return response;
}
