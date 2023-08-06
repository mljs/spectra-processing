import { xAbsolute } from '../../index';

describe('xAbsolute', () => {
  it('normal array', () => {
    const array = [-1, 2, -3, 4];
    expect(xAbsolute(array)).toStrictEqual([1, 2, 3, 4]);
  });

  it('typed array', () => {
    const array = new Float64Array([-1, 2, -3, 4]);
    expect(Array.from(xAbsolute(array))).toStrictEqual([1, 2, 3, 4]);
  });
});
