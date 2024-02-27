import { DoubleArray } from 'cheminfo-types';

export type DoubleMatrix = DoubleArray[];

export type NumberArrayConstructor =
  | ArrayConstructor
  | Float64ArrayConstructor
  | Float32ArrayConstructor
  | Int32ArrayConstructor
  | Int16ArrayConstructor
  | Int8ArrayConstructor
  | Uint32ArrayConstructor
  | Uint16ArrayConstructor
  | Uint8ArrayConstructor
  | Uint8ClampedArrayConstructor;

export type NumberArrayType<
  ArrayConstructorType extends NumberArrayConstructor,
> = ArrayConstructorType extends Float64ArrayConstructor
  ? Float64Array
  : ArrayConstructorType extends Float32ArrayConstructor
    ? Float32Array
    : ArrayConstructorType extends Int32ArrayConstructor
      ? Int32Array
      : ArrayConstructorType extends Int16ArrayConstructor
        ? Int16Array
        : ArrayConstructorType extends Int8ArrayConstructor
          ? Int8Array
          : ArrayConstructorType extends Uint32ArrayConstructor
            ? Uint32Array
            : ArrayConstructorType extends Uint16ArrayConstructor
              ? Uint16Array
              : ArrayConstructorType extends Uint8ArrayConstructor
                ? Uint8Array
                : ArrayConstructorType extends Uint8ClampedArrayConstructor
                  ? Uint8ClampedArray
                  : number[];

export type DoubleArrayConstructor = ArrayConstructor | Float64ArrayConstructor;
export type DoubleArrayType<
  ArrayConstructorType extends DoubleArrayConstructor,
> = ArrayConstructorType extends Float64ArrayConstructor
  ? Float64Array
  : number[];
