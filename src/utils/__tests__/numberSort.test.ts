import binarySearch from 'binary-search';
import { toBeDeepCloseTo } from 'jest-matcher-deep-close-to';

import { numberSortAscending, numberSortDescending } from '../numberSort';

expect.extend({ toBeDeepCloseTo });

let x = [0, 3, 4, 2, 6]; // sorted : [0, 2, 3, 4, 6]

describe('numberSort', () => {
  it('testing numberSortDescending', () => {
    let index = binarySearch(x, x[2], numberSortDescending);
    expect(index).toBeDeepCloseTo(2);
  });

  it('testing numberSortAscending', () => {
    let index = binarySearch(x, x[2], numberSortAscending);
    expect(index).toBeDeepCloseTo(2);
  });
});
