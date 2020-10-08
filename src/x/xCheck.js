import isArray from 'is-any-array';

/**
 * Checks if input is valdi
 * @param {Array<number>} input

 */
export default function xCheck(input) {
  if (!isArray(input)) {
    throw new TypeError('input must be an array');
  }

  if (input.length === 0) {
    throw new TypeError('input must not be empty');
  }
}
