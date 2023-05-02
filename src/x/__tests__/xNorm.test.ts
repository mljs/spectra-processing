import { xNorm } from '../../index';

describe('xNorm', () => {
  it('Should return the norm of the vector', () => {
    expect(xNorm([3, 4])).toBe(5);
    expect(xNorm([-3, 4])).toBe(5);
    expect(xNorm([3, -4])).toBe(5);
    expect(xNorm([-3, -4])).toBe(5);
    expect(xNorm([1, 2, 2])).toBe(3);
    expect(xNorm([2, 3, 6])).toBe(7);
    expect(xNorm([4, 4, 7])).toBe(9);
    expect(xNorm([1, 4, 8])).toBe(9);
  });
});
