import { NumberArrayConstructor, NumberArrayType } from '../types';

import { xSequentialFillFromStep } from './xSequentialFillFromStep';

export interface XSequentialFillFromToOptions<
  ArrayConstructorType extends NumberArrayConstructor = Float64ArrayConstructor,
> {
  /**
   * Allows to specify the type of array to use.
   * @default Float64Array
   */
  ArrayConstructor?: ArrayConstructorType;
}

export function xSequentialFillFromTo<
  ArrayConstructorType extends NumberArrayConstructor = Float64ArrayConstructor,
>(
  from: number,
  to: number,
  size: number,
  options: XSequentialFillFromToOptions<ArrayConstructorType> = {},
): NumberArrayType<NumberArrayConstructor> {
  const step = (to - from) / (size - 1);
  return xSequentialFillFromStep(from, step, size, options);
}
