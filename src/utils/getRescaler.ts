type Algorithms = 'linear' | 'logarithmic' | 'power';

export interface RescalerOptions {
  /**
   * The minimum value of the original range
   * @default 0
   */
  originalMin?: number;
  /**
   * The maximum value of the original range
   * @default 1
   */
  originalMax?: number;
  /**
   * The new minimum value of the target range
   * @default 0
   */
  targetMin?: number;
  /**
   * The new maximum value of the target range
   * @default 1
   */
  targetMax?: number;
  /**
   * If true, the value will be clamp to the target range
   * @default true
   */
  clamp?: boolean;
  /**
   * The algorithm to use for the rescaling
   * @default 'linear'
   */
  algorithm?: Algorithms;
  /**
   * Options for the algorithm
   * @default {}
   */
  algorithmOptions?: Record<string, number>;
}

export function getRescaler(options: RescalerOptions = {}) {
  const {
    targetMin = 0,
    targetMax = 1,
    clamp = true,
    algorithmOptions = {},
  } = options;
  let { originalMin = 0, originalMax = 1 } = options;

  const convert = getDataConverter(
    options.algorithm || 'linear',
    algorithmOptions,
  );
  originalMin = convert(originalMin);
  originalMax = convert(originalMax);

  const originalRange = originalMax - originalMin;
  const targetRange = targetMax - targetMin;

  return (value: number) => {
    value = convert(value);
    value = checkRange(value, originalMin, originalMax, clamp);

    const valueScaled = (value - originalMin) / originalRange;
    return targetMin + valueScaled * targetRange;
  };
}

function getDataConverter(
  kind: Algorithms = 'linear',
  options: { power?: number } = {},
) {
  return (value: number) => {
    switch (kind) {
      case 'linear':
        return value;
      case 'logarithmic':
        return Math.log10(value);
      case 'power':
        return value ** (options.power || 2);
      default:
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        throw new Error(`Unknown kind ${kind}`);
    }
  };
}

function checkRange(
  value: number,
  min: number,
  max: number,
  clamp = true,
): number {
  if (value < min) {
    if (clamp) return min;
    throw new RangeError(`Value ${value} is out of range [${min}, ${max}]`);
  }
  if (value > max) {
    if (clamp) return max;
    throw new RangeError(`Value ${value} is out of range [${min}, ${max}]`);
  }
  return value;
}
