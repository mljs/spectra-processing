import { xAbsoluteMedian } from '../../index';

describe('xAbsoluteMedian', () => {
  it('positive values', () => {
    const array = [1, 2, 3, 4, 5];
    expect(xAbsoluteMedian(array)).toBe(3);
  });

  it('mixed values', () => {
    const array = [1, -2, 3, -4, 5];
    expect(xAbsoluteMedian(array)).toBe(3);
  });
});
