/**
 *
 * @param {array} [data] array of growing points {x,y}
 * @param {object} [options={}]
 * @param {object} [threshold=Number.EPSILON] limit to join the data
 */
export function joinX(data, options = {}) {
  const { threshold = Number.EPSILON } = options;

  // when we join we will use the center of mass
  let result = [];
  let current = {
    x: Number.MIN_SAFE_INTEGER,
    y: 0,
  };
  for (let item of data) {
    if (item.x - current.x <= threshold) {
      // weighted sum
      current.x =
        (item.y / (current.y + item.y)) * (item.x - current.x) + current.x;
      current.y += item.y;
    } else {
      current = {
        x: item.x,
        y: item.y,
      };
      result.push(current);
    }
  }
  return result;
}
