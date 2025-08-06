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
  ? Float64Array<ArrayBuffer>
  : ArrayConstructorType extends Float32ArrayConstructor
    ? Float32Array<ArrayBuffer>
    : ArrayConstructorType extends Int32ArrayConstructor
      ? Int32Array<ArrayBuffer>
      : ArrayConstructorType extends Int16ArrayConstructor
        ? Int16Array<ArrayBuffer>
        : ArrayConstructorType extends Int8ArrayConstructor
          ? Int8Array<ArrayBuffer>
          : ArrayConstructorType extends Uint32ArrayConstructor
            ? Uint32Array<ArrayBuffer>
            : ArrayConstructorType extends Uint16ArrayConstructor
              ? Uint16Array<ArrayBuffer>
              : ArrayConstructorType extends Uint8ArrayConstructor
                ? Uint8Array<ArrayBuffer>
                : ArrayConstructorType extends Uint8ClampedArrayConstructor
                  ? Uint8ClampedArray<ArrayBuffer>
                  : number[];

export type DoubleArrayConstructor = ArrayConstructor | Float64ArrayConstructor;
export type DoubleArrayType<
  ArrayConstructorType extends DoubleArrayConstructor,
> = ArrayConstructorType extends Float64ArrayConstructor
  ? Float64Array<ArrayBuffer>
  : number[];

export function createNumberArray<
  ArrayConstructorType extends NumberArrayConstructor = Float64ArrayConstructor,
>(
  ArrayConstructor: ArrayConstructorType,
  length: number,
): NumberArrayType<ArrayConstructorType> {
  if (ArrayConstructor === Array) {
    return new ArrayConstructor(length).fill(
      0,
    ) as NumberArrayType<ArrayConstructorType>;
  } else {
    return new ArrayConstructor(
      length,
    ) as NumberArrayType<ArrayConstructorType>;
  }
}

export function createDoubleArray<
  ArrayConstructorType extends DoubleArrayConstructor = Float64ArrayConstructor,
>(
  ArrayConstructor: ArrayConstructorType,
  length: number,
): DoubleArrayType<ArrayConstructorType> {
  if (ArrayConstructor === Array) {
    return new ArrayConstructor(length).fill(
      0,
    ) as DoubleArrayType<ArrayConstructorType>;
  } else {
    return new ArrayConstructor(
      length,
    ) as DoubleArrayType<ArrayConstructorType>;
  }
}
