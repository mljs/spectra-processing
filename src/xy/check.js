import isAnyArray from 'is-any-array';

/**
 * Throw an error in no an object of x,y arrays
 * @param {object} [points={}]
 */
export function check(points = {}) {
  if (!isAnyArray(points.x) || !isAnyArray(points.y)) {
    throw new Error('Points must be an object of x and y arrays');
  }
  if (points.x.length !== points.y.length) {
    throw new Error('The x and y arrays mush have the same length');
  }
}
