import { xAbsoluteMedian } from '../../index';

describe('xAbsoluteMedian', () => {
  it('positive values', () => {
    let array = [1, 2, 3, 4, 5];
    expect(xAbsoluteMedian(array)).toBe(3);
  });

  it('mixed values', () => {
    let array = [1, -2, 3, -4, 5];
    expect(xAbsoluteMedian(array)).toBe(3);
  });
});
