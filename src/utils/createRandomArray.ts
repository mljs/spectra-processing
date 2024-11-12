import { XSadd } from 'ml-xsadd';

export interface CreateRandomArrayOptions {
  /**
   * Type of random distribution.
   * 'uniform' (true random) or 'normal' (gaussian distribution)
   * @default 'normal'
   */
  distribution?: 'uniform' | 'normal';

  /**
   * Seed for a deterministic sequence of random numbers.
   * @default Date.now()
   */
  seed?: number;

  /**
   * mean
   * @default 0
   */
  mean?: number;

  /**
   * standardDeviation, used in case of normal distribution
   * @default 1
   */
  standardDeviation?: number;

  /**
   *range, used in case of uniform distribution
   * @default 1
   */
  range?: number;

  /**
   * number of points
   * @default 1000
   */
  length?: number;
}

/**
 * Create a random array of numbers of a specific length.
 * @param options
 * @returns - array of random floats normally distributed
 */
export function createRandomArray(
  options: CreateRandomArrayOptions = {},
): Float64Array {
  const {
    mean = 0,
    standardDeviation = 1,
    length = 1000,
    range = 1,
    seed,
    distribution = 'normal',
  } = options;

  const generator = new XSadd(seed);
  const returnArray = new Float64Array(length);

  switch (distribution) {
    case 'normal': {
      const gaussianGenerator = new GaussianGenerator(
        mean,
        standardDeviation,
        generator,
      );
      for (let i = 0; i < length; i++) {
        returnArray[i] = gaussianGenerator.generateGaussian();
      }
      break;
    }
    case 'uniform': {
      for (let i = 0; i < length; i++) {
        returnArray[i] = (generator.random() - 0.5) * range + mean;
      }
      break;
    }
    default: {
      throw new Error(`unknown distribution: ${String(distribution)}`);
    }
  }

  return returnArray;
}

class GaussianGenerator {
  #spare = 0;
  #hasSpare = false;

  #mean: number;
  #standardDeviation: number;
  #generator: XSadd;

  constructor(mean: number, standardDeviation: number, generator: XSadd) {
    this.#mean = mean;
    this.#standardDeviation = standardDeviation;
    this.#generator = generator;
  }

  generateGaussian(): number {
    let val, u, v, s;

    if (this.#hasSpare) {
      this.#hasSpare = false;
      val = this.#spare * this.#standardDeviation + this.#mean;
    } else {
      do {
        u = this.#generator.random() * 2 - 1;
        v = this.#generator.random() * 2 - 1;

        s = u * u + v * v;
      } while (s >= 1 || s === 0);

      s = Math.sqrt((-2 * Math.log(s)) / s);

      this.#spare = v * s;
      this.#hasSpare = true;
      val = this.#mean + this.#standardDeviation * u * s;
    }
    return val;
  }
}
