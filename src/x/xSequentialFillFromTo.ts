import type {
  NumberArrayConstructor,
  NumberArrayType,
} from '../utils/index.ts';

import { xSequentialFillFromStep } from './xSequentialFillFromStep.ts';

export interface XSequentialFillFromToOptions<
  ArrayConstructorType extends NumberArrayConstructor = Float64ArrayConstructor,
> {
  /**
   * Allows to specify the type of array to use.
   * @default Float64Array
   */
  ArrayConstructor?: ArrayConstructorType;
}

export interface XSequentialFillFromToParameters {
  from: number;
  to: number;
  size: number;
}

export function xSequentialFillFromTo<
  ArrayConstructorType extends NumberArrayConstructor = Float64ArrayConstructor,
>(
  parameters: XSequentialFillFromToParameters,
  options: XSequentialFillFromToOptions<ArrayConstructorType> = {},
): NumberArrayType<ArrayConstructorType> {
  const { from, to, size } = parameters;
  const step = (to - from) / (size - 1);
  return xSequentialFillFromStep({ from, step, size }, options);
}
