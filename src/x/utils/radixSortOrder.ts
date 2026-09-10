import type { NumberArray } from 'cheminfo-types';

import { isLittleEndian } from '../../utils/isLittleEndian.ts';

// Internal helpers: not re-exported from `x/index.ts`, so they stay out of the public API.

// The counting pass costs O(radix) whatever the length, so the digit stays narrow until the
// array is long enough to amortize a wide one.
const SMALL_DIGIT_BITS = 8;
const LARGE_DIGIT_BITS = 16;
const LARGE_ARRAY_LENGTH = 1 << LARGE_DIGIT_BITS;

/**
 * Length from which ordering through the radix beats a comparator, for a caller that has to
 * build the keys and read the values back through the order. The measured crossover is around
 * 150 values on both V8 and JavaScriptCore, whether the values come from a typed array, a
 * plain array or the x of an array of points.
 */
export const RADIX_ORDER_MIN_LENGTH = 1 << SMALL_DIGIT_BITS;

/**
 * Orders the values by their full 64 bits, as an LSD radix sort.
 * @param array - the values to order.
 * @param descending - order from the largest to the smallest.
 * @returns the indices of the values, in order.
 */
export function radixSortOrderExact(
  array: NumberArray,
  descending: boolean,
): Uint32Array {
  const values = ensureFloat64(array);
  const length = values.length;
  let order = new Uint32Array(length);
  if (length < 2) return order;

  const digitBits = getDigitBits(length);
  const radix = 1 << digitBits;
  const digitMask = radix - 1;
  const words = new Uint32Array(values.buffer, values.byteOffset, length * 2);
  const flip = descending ? 0xffffffff : 0;
  const highWord = isLittleEndian() ? 1 : 0;
  const lowWord = 1 - highWord;

  let keysLow = new Uint32Array(length);
  let keysHigh = new Uint32Array(length);
  for (let i = 0; i < length; i++) {
    const high = words[i * 2 + highWord];
    const low = words[i * 2 + lowWord];
    // Monotonic unsigned key of the double: a negative flips every bit, a positive only the
    // sign bit. Complementing that key reverses the order.
    if ((high & 0x80000000) === 0) {
      keysHigh[i] = high ^ 0x80000000 ^ flip;
      keysLow[i] = low ^ flip;
    } else {
      keysHigh[i] = ~high ^ flip;
      keysLow[i] = ~low ^ flip;
    }
    order[i] = i;
  }

  let nextOrder = new Uint32Array(length);
  let nextLow = new Uint32Array(length);
  let nextHigh = new Uint32Array(length);
  const counts = new Uint32Array(radix);

  for (let shift = 0; shift < 64; shift += digitBits) {
    const onHigh = shift >= 32;
    const wordShift = onHigh ? shift - 32 : shift;
    const keys = onHigh ? keysHigh : keysLow;

    counts.fill(0);
    for (let i = 0; i < length; i++) {
      counts[(keys[i] >>> wordShift) & digitMask]++;
    }
    // A digit shared by every value would make this pass the identity.
    if (counts[(keys[0] >>> wordShift) & digitMask] === length) continue;
    cumulate(counts);

    for (let i = 0; i < length; i++) {
      const low = keysLow[i];
      const high = keysHigh[i];
      const at = counts[((onHigh ? high : low) >>> wordShift) & digitMask]++;
      nextOrder[at] = order[i];
      nextLow[at] = low;
      nextHigh[at] = high;
    }
    // A destructuring swap makes JavaScriptCore give up the typed array specialization of
    // these variables, which costs 8x on the whole sort.
    let swap = order;
    order = nextOrder;
    nextOrder = swap;
    swap = keysLow;
    keysLow = nextLow;
    nextLow = swap;
    swap = keysHigh;
    keysHigh = nextHigh;
    nextHigh = swap;
  }

  return order;
}

/**
 * Orders the values by the high word of each double, as an LSD radix sort. Values differing by
 * less than their 2^-20 relative resolution share a key and keep their input order.
 * @param array - the values to order.
 * @param descending - order from the largest to the smallest.
 * @returns the indices of the values, in order.
 */
export function radixSortOrderApproximate(
  array: NumberArray,
  descending: boolean,
): Uint32Array {
  const values = ensureFloat64(array);
  const length = values.length;
  let order = new Uint32Array(length);
  if (length < 2) return order;

  const digitBits = getDigitBits(length);
  const radix = 1 << digitBits;
  const digitMask = radix - 1;
  const words = new Uint32Array(values.buffer, values.byteOffset, length * 2);
  const flip = descending ? 0xffffffff : 0;
  const highWord = isLittleEndian() ? 1 : 0;

  let keys = new Uint32Array(length);
  for (let i = 0; i < length; i++) {
    const high = words[i * 2 + highWord];
    keys[i] = ((high & 0x80000000) === 0 ? high ^ 0x80000000 : ~high) ^ flip;
    order[i] = i;
  }

  let nextOrder = new Uint32Array(length);
  let nextKeys = new Uint32Array(length);
  const counts = new Uint32Array(radix);

  for (let shift = 0; shift < 32; shift += digitBits) {
    counts.fill(0);
    for (let i = 0; i < length; i++) {
      counts[(keys[i] >>> shift) & digitMask]++;
    }
    if (counts[(keys[0] >>> shift) & digitMask] === length) continue;
    cumulate(counts);

    for (let i = 0; i < length; i++) {
      const key = keys[i];
      const at = counts[(key >>> shift) & digitMask]++;
      nextOrder[at] = order[i];
      nextKeys[at] = key;
    }
    // See radixSortOrderExact: a destructuring swap is 8x slower on JavaScriptCore.
    let swap = order;
    order = nextOrder;
    nextOrder = swap;
    swap = keys;
    keys = nextKeys;
    nextKeys = swap;
  }

  return order;
}

/**
 * Turns the counts of each digit into the position its first entry goes to.
 * @param counts - counts per digit, replaced in place by the start offsets.
 */
function cumulate(counts: Uint32Array): void {
  let start = 0;
  for (let i = 0; i < counts.length; i++) {
    const count = counts[i];
    counts[i] = start;
    start += count;
  }
}

/**
 * Picks the digit width, keeping the radix no wider than the array it scans.
 * @param length - number of values to order.
 * @returns the number of bits of one digit.
 */
function getDigitBits(length: number): number {
  return length >= LARGE_ARRAY_LENGTH ? LARGE_DIGIT_BITS : SMALL_DIGIT_BITS;
}

/**
 * Returns the values as a Float64Array, without copying one that already is.
 * @param array - values.
 * @returns the values, readable as doubles.
 */
function ensureFloat64(array: NumberArray): Float64Array {
  return array instanceof Float64Array ? array : Float64Array.from(array);
}
