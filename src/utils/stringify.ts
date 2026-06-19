/* eslint-disable @typescript-eslint/no-explicit-any */

import type { NumberArray } from 'cheminfo-types';

/**
 * Stringify an object and convert all typed arrays to arrays
 * @param object - object to stringify.
 * @param replacer - optional replacer function.
 * @param space - optional indentation.
 * @returns JSON string.
 */
export function stringify(
  object: any,
  replacer?: (this: any, key: string, value: any) => any,
  space?: string | number,
): string {
  const internalReplacer = (key: string, value: any) => {
    if (ArrayBuffer.isView(value)) {
      value = Array.from(value as NumberArray);
    }
    if (replacer) {
      return replacer(key, value);
    }
    return value;
  };

  return JSON.stringify(object, internalReplacer, space);
}
