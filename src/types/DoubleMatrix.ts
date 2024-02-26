import { DoubleArray } from 'cheminfo-types';

export type DoubleMatrix = DoubleArray[];

export type DoubleArrayConstructor = ArrayConstructor | Float64ArrayConstructor;
export type DoubleArrayType<
  ArrayConstructorType extends DoubleArrayConstructor,
> = ArrayConstructorType extends Float64ArrayConstructor
  ? Float64Array
  : number[];
