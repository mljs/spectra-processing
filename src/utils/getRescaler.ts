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
}

export function getRescaler(options: RescalerOptions = {}) {
  const {
    originalMin = 0,
    originalMax = 1,
    targetMin = 0,
    targetMax = 1,
    clamp = true,
  } = options;

  return (value: number) => {
    if (value < originalMin) {
      if (clamp) return targetMin;
      throw new RangeError(
        `Value ${value} is out of range [${originalMin}, ${originalMax}]`,
      );
    }
    if (value > originalMax) {
      if (clamp) return targetMax;
      throw new RangeError(
        `Value ${value} is out of range [${originalMin}, ${originalMax}]`,
      );
    }
    const originalRange = originalMax - originalMin;
    const targetRange = targetMax - targetMin;
    const valueScaled = (value - originalMin) / originalRange;
    return targetMin + valueScaled * targetRange;
  };
}
