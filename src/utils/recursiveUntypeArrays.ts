import type { NumberArray } from 'cheminfo-types';

/**
 * Recursively change the typed arrays to normal arrays
 * The changes are done in-place !
 * @param object
 * @returns
 */
export function recursiveUntypeArrays(object: unknown) {
  if (typeof object !== 'object') return object;
  object = modifier(object);
  return object;
}

function modifier(object: any) {
  if (typeof object !== 'object') return object;
  if (ArrayBuffer.isView(object)) {
    return Array.from(object as NumberArray);
  }
  for (const key in object) {
    if (ArrayBuffer.isView(object[key])) {
      object[key] = Array.from(object[key] as NumberArray);
    } else if (typeof object[key] === 'object') {
      modifier(object[key]);
    }
  }
  return object;
}
