import { xNorm } from '../xNorm.js';

describe('xNorm', function () {
  it('Should return the norm of the vector', () => {
    expect(xNorm([3, 4])).toStrictEqual(5);
    expect(xNorm([-3, 4])).toStrictEqual(5);
    expect(xNorm([3, -4])).toStrictEqual(5);
    expect(xNorm([-3, -4])).toStrictEqual(5);
    expect(xNorm([1, 2, 2])).toStrictEqual(3);
    expect(xNorm([2, 3, 6])).toStrictEqual(7);
    expect(xNorm([4, 4, 7])).toStrictEqual(9);
    expect(xNorm([1, 4, 8])).toStrictEqual(9);
  });
});
