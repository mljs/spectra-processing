/**
 * Create a random array of numbers of a specific length, with gaussian distribution with a specific mean and standard deviation
 *
 * @param options - options
 * @return - array of random floats normally distributed
 */

let spare: number;
let hasSpare = false;

export function createNormalRandomXArray(
  options: {
    /**
     * mean
     * @default 0 */
    mean?: number;
    /**
     * standardDeviation
     * @default 1 */
    standardDeviation?: number;
    /**
     * number of points
     * @default 100 */
    length?: number;
  } = {},
): Float64Array {
  let { mean = 0, standardDeviation = 1, length = 100 } = options;

  let returnArray = new Float64Array(length);
  for (let i = 0; i < length; i++) {
    returnArray[i] = generateGaussian(mean, standardDeviation);
  }

  return returnArray;
}

function generateGaussian(
  /**
   * mean
   * @default 0 */
  mean: number,
  /**
   * standardDeviation
   * @default 1 */
  standardDeviation: number,
): number {
  let val, u, v, s;

  if (hasSpare) {
    hasSpare = false;
    val = spare * standardDeviation + mean;
  } else {
    do {
      u = Math.random() * 2 - 1;
      v = Math.random() * 2 - 1;

      s = u * u + v * v;
    } while (s >= 1 || s === 0);

    s = Math.sqrt((-2.0 * Math.log(s)) / s);

    spare = v * s;
    hasSpare = true;
    val = mean + standardDeviation * u * s;
  }
  return val;
}
