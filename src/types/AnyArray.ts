/**
 * In order to store an array of numbers we prefer to either use native javascript
 * arrays or to use Float64Array
 */

export type AnyArray =
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array;
