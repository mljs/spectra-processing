import {
  createNumberArray,
  NumberArrayConstructor,
  NumberArrayType,
} from '../utils';

export interface XSequentialFillFromStepOptions<
  ArrayConstructorType extends NumberArrayConstructor = Float64ArrayConstructor,
> {
  /**
   * Allows to specify the type of array to use.
   * @default Float64Array
   */
  ArrayConstructor?: ArrayConstructorType;
}

export function xSequentialFillFromStep<
  ArrayConstructorType extends NumberArrayConstructor = Float64ArrayConstructor,
>(
  from: number,
  step: number,
  size: number,
  options: XSequentialFillFromStepOptions<ArrayConstructorType> = {},
): NumberArrayType<ArrayConstructorType> {
  const { ArrayConstructor = Float64Array as ArrayConstructorType } = options;
  const result = createNumberArray(ArrayConstructor, size);
  for (let i = 0; i < size; i++) {
    result[i] = from + i * step;
  }
  return result;
}
