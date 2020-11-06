import { xNorm } from '../xNorm.js';

describe('xNorm', function () {
  it('Should return the norm of the vector', () => {
    expect(xNorm([3, 4])).toStrictEqual(5);
    expect(xNorm([-3, 4])).toStrictEqual(5);
    expect(xNorm([3, -4])).toStrictEqual(5);
    expect(xNorm([-3, -4])).toStrictEqual(5);
  });
});
