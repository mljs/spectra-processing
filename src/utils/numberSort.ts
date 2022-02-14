function assertNumber(number: number) {
  if (typeof number !== 'number') {
    throw new TypeError('Expected a number');
  }
}

/**
 * Function for comparing numbers and sorting them in ascending order
 *
 * @param options - options
 */
export function numberSortAscending(left: number, right: number) {
  assertNumber(left);
  assertNumber(right);

  if (Number.isNaN(left)) {
    return -1;
  }

  if (Number.isNaN(right)) {
    return 1;
  }

  return left - right;
}

/**
 * Function for comparing numbers and sorting them in descending order
 *
 * @param options - options
 */
export function numberSortDescending(left: number, right: number) {
  assertNumber(left);
  assertNumber(right);

  if (Number.isNaN(left)) {
    return 1;
  }

  if (Number.isNaN(right)) {
    return -1;
  }

  return right - left;
}
