import { xAbsoluteMedian } from '../xAbsoluteMedian.js';

describe('xAbsoluteMedian', function () {
  it('positive values', () => {
    let array = [1, 2, 3, 4, 5];
    expect(xAbsoluteMedian(array)).toBe(3);
  });

  it('mixed values', () => {
    let array = [1, -2, 3, -4, 5];
    expect(xAbsoluteMedian(array)).toBe(3);
  });
});
