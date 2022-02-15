import XSAdd from 'ml-xsadd';
/**
 * Create a random array of numbers of a specific length
 *
 * @return - array of random floats normally distributed
 */

let spare: number;
let hasSpare = false;

export function createRandomArray(
  options: {
    /**
     * Type of random distribution.
     * 'uniform' (true random) or 'normal' (gaussian distribution)
     */
    distribution?: 'uniform' | 'normal';
    /**
     * Seed for a deterministic sequence of random numbers.
     * @default Date.now()
     */
    seed?: number;
    /**
     * mean
     * @default 0 */
    mean?: number;
    /**
     * standardDeviation, used in case of normal distribution
     * @default 1 */
    standardDeviation?: number;
    /**
     *range, used in case of uniform distribution
     * @default 1 */
    range?: number;
    /**
     * number of points
     * @default 1000 */
    length?: number;
  } = {},
): Float64Array {
  let {
    mean = 0,
    standardDeviation = 1,
    length = 1000,
    range = 1,
    seed,
    distribution = 'normal',
  } = options;

  const generator = new XSAdd(seed);

  let returnArray = new Float64Array(length);
  switch (distribution) {
    case 'normal':
      for (let i = 0; i < length; i++) {
        returnArray[i] = generateGaussian(mean, standardDeviation, generator);
      }
      break;
    case 'uniform':
      for (let i = 0; i < length; i++) {
        returnArray[i] = (generator.random() - 0.5) * range + mean;
      }
      break;
    default:
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      throw new Error(`unknown distribution: ${distribution}`);
  }

  return returnArray;
}

function generateGaussian(
  mean: number,
  standardDeviation: number,
  generator: XSAdd,
): number {
  let val, u, v, s;

  if (hasSpare) {
    hasSpare = false;
    val = spare * standardDeviation + mean;
  } else {
    do {
      u = generator.random() * 2 - 1;
      v = generator.random() * 2 - 1;

      s = u * u + v * v;
    } while (s >= 1 || s === 0);

    s = Math.sqrt((-2.0 * Math.log(s)) / s);

    spare = v * s;
    hasSpare = true;
    val = mean + standardDeviation * u * s;
  }
  return val;
}
