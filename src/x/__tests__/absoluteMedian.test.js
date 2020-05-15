import { absoluteMedian } from '../absoluteMedian.js';

describe('absoluteMedian', function () {
  it('positive values', () => {
    let array = [1, 2, 3, 4, 5];
    expect(absoluteMedian(array)).toBe(3);
  });

  it('mixed values', () => {
    let array = [1, -2, 3, -4, 5];
    expect(absoluteMedian(array)).toBe(3);
  });
});
