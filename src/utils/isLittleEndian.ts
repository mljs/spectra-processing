const LITTLE_ENDIAN = new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;

/**
 * Check whether the host stores multi-byte values least significant byte first.
 * Needed whenever a typed array is reinterpreted through another view, because
 * the position of the words of a value then depends on the platform.
 * @returns true on a little-endian host.
 */
export function isLittleEndian(): boolean {
  return LITTLE_ENDIAN;
}
