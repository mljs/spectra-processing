import type { NumberArray } from 'cheminfo-types';

type TypedNumberArray = Exclude<NumberArray, number[]>;

/**
 * Copies the values into an array of the same kind of twice the length, the added positions
 * left at zero. A typed array cannot be resized, so a buffer that fills up has to allocate a
 * longer one and copy into it; doubling is what keeps the total cost of filling a buffer of
 * unknown size linear. An empty array becomes one element long, so that doubling it repeatedly
 * makes progress.
 * @param array - values to copy.
 * @returns an array of the same kind, twice as long, holding the same values.
 */
export function xDoubleTypedArrayLength<ArrayType extends TypedNumberArray>(
  array: ArrayType,
): ArrayType {
  const Constructor = array.constructor as new (length: number) => ArrayType;
  const grown = new Constructor(Math.max(1, array.length * 2));
  grown.set(array);

  return grown;
}
